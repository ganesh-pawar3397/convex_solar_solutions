import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Star, MapPin, Upload, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getTestimonials, addTestimonial, deleteTestimonial, uploadImage, Testimonial } from "@/lib/supabaseService";
import { useToast } from "@/hooks/use-toast";
import { compressImage, isValidImageFile, getFileSizeMB } from "@/lib/imageUtils";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        customer_name: "",
        location: "",
        rating: 5,
        review: "",
    });

    const loadTestimonials = async () => {
        setIsLoading(true);
        const data = await getTestimonials();
        setTestimonials(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadTestimonials();
    }, []);

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!isValidImageFile(file)) {
            toast({ title: "Invalid file", description: "Please upload a JPG, PNG, or WebP image.", variant: "destructive" });
            return;
        }

        if (getFileSizeMB(file) > 5) {
            toast({ title: "File too large", description: "Please upload an image under 5MB.", variant: "destructive" });
            return;
        }

        setImageFile(file);
        const compressed = await compressImage(file, 200, 0.7);
        setPreviewUrl(compressed.base64);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.customer_name || !formData.review) {
            toast({ title: "Error", description: "Please fill in required fields", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);
        try {
            let imageUrl = null;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile, "testimonials");
            }

            await addTestimonial({
                ...formData,
                image_url: imageUrl,
            });

            await loadTestimonials();
            setFormData({ customer_name: "", location: "", rating: 5, review: "" });
            setPreviewUrl("");
            setImageFile(null);
            setShowForm(false);
            toast({ title: "Success", description: "Testimonial added successfully!" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to add testimonial", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteTestimonial(id);
        await loadTestimonials();
        toast({ title: "Deleted", description: "Testimonial removed." });
    };

    const clearImage = () => {
        setPreviewUrl("");
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="container mx-auto p-8">
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4">
                    <Link to="/convex_ad">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                    </Link>
                </Button>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
                        <p className="text-muted-foreground">Manage customer reviews</p>
                    </div>
                    <Button onClick={() => setShowForm(!showForm)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Testimonial
                    </Button>
                </div>
            </div>

            {/* Add Form */}
            {showForm && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Add New Testimonial</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Customer Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.customer_name}
                                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                                    placeholder="e.g. Ganesh Pawar"
                                />
                            </div>
                            <div>
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="e.g. Ahmednagar"
                                />
                            </div>
                            <div>
                                <Label htmlFor="rating">Rating (1-5)</Label>
                                <Input
                                    id="rating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                                />
                            </div>
                            <div>
                                <Label>Customer Photo</Label>
                                <div className="mt-1">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleImageSelect}
                                        className="hidden"
                                    />
                                    {previewUrl ? (
                                        <div className="relative inline-block">
                                            <img src={previewUrl} alt="Preview" className="w-14 h-14 rounded-full object-cover" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute -top-1 -right-1 h-5 w-5"
                                                onClick={clearImage}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Upload className="h-4 w-4 mr-2" /> Upload Photo
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="review">Review *</Label>
                                <Textarea
                                    id="review"
                                    value={formData.review}
                                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                                    placeholder="Customer's testimonial..."
                                    rows={4}
                                />
                            </div>
                            <div className="md:col-span-2 flex gap-2">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Testimonial
                                </Button>
                                <Button type="button" variant="outline" onClick={() => { setShowForm(false); clearImage(); }}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <>
                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <Card key={t.id} className="overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        {t.image_url ? (
                                            <img
                                                src={t.image_url}
                                                alt={t.customer_name}
                                                loading="lazy"
                                                className="w-14 h-14 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                                {t.customer_name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-semibold">{t.customer_name}</h3>
                                            {t.location && (
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <MapPin className="h-3 w-3" />
                                                    {t.location}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < t.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-4">"{t.review}"</p>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="mt-4"
                                        onClick={() => handleDelete(t.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {testimonials.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No testimonials added yet. Click "Add Testimonial" to get started.
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Testimonials;
