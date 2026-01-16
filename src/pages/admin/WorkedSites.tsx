import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, MapPin, Zap, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getWorkedSites, addWorkedSite, deleteWorkedSite, uploadImage, WorkedSite } from "@/lib/supabaseService";
import { useToast } from "@/hooks/use-toast";
import { compressImage, isValidImageFile, getFileSizeMB } from "@/lib/imageUtils";

const WorkedSites = () => {
    const [sites, setSites] = useState<WorkedSite[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        system_size: "",
        description: "",
    });

    const loadSites = async () => {
        setIsLoading(true);
        const data = await getWorkedSites();
        setSites(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadSites();
    }, []);

    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!isValidImageFile(file)) {
            toast({ title: "Invalid file", description: "Please upload a JPG, PNG, or WebP image.", variant: "destructive" });
            return;
        }

        if (getFileSizeMB(file) > 10) {
            toast({ title: "File too large", description: "Please upload an image under 10MB.", variant: "destructive" });
            return;
        }

        setImageFile(file);
        // Create preview
        const compressed = await compressImage(file, 400, 0.6);
        setPreviewUrl(compressed.base64);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.location) {
            toast({ title: "Error", description: "Please fill in required fields", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);
        try {
            let imageUrl = null;

            // Upload image to Supabase Storage if selected
            if (imageFile) {
                imageUrl = await uploadImage(imageFile, "projects");
            }

            await addWorkedSite({
                ...formData,
                image_url: imageUrl,
            });

            await loadSites();
            setFormData({ title: "", location: "", system_size: "", description: "" });
            setPreviewUrl("");
            setImageFile(null);
            setShowForm(false);
            toast({ title: "Success", description: "Project added successfully!" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to add project", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteWorkedSite(id);
        await loadSites();
        toast({ title: "Deleted", description: "Project removed." });
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
                        <h1 className="text-3xl font-bold tracking-tight">Worked Sites</h1>
                        <p className="text-muted-foreground">Manage your completed project gallery</p>
                    </div>
                    <Button onClick={() => setShowForm(!showForm)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                </div>
            </div>

            {/* Add Form */}
            {showForm && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Add New Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="title">Site Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Ganesh Pawar Residence, Ahmednagar"
                                />
                            </div>
                            <div>
                                <Label htmlFor="capacity">Capacity *</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Mumbai, Maharashtra"
                                />
                            </div>
                            <div>
                                <Label htmlFor="systemSize">System Size</Label>
                                <Input
                                    id="systemSize"
                                    value={formData.system_size}
                                    onChange={(e) => setFormData({ ...formData, system_size: e.target.value })}
                                    placeholder="3 kW"
                                />
                            </div>
                            <div>
                                <Label>Project Image</Label>
                                <div className="mt-1">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleImageSelect}
                                        className="hidden"
                                    />
                                    {previewUrl ? (
                                        <div className="relative">
                                            <img src={previewUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute top-2 right-2"
                                                onClick={clearImage}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full h-32 flex flex-col gap-2"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Upload className="h-6 w-6" />
                                            <span>Click to upload image</span>
                                            <span className="text-xs text-muted-foreground">JPG, PNG, WebP (max 10MB)</span>
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief description of the project..."
                                    rows={3}
                                />
                            </div>
                            <div className="md:col-span-2 flex gap-2">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Project
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
                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sites.map((site) => (
                            <Card key={site.id} className="overflow-hidden">
                                {site.image_url ? (
                                    <img
                                        src={site.image_url}
                                        alt={site.title}
                                        loading="lazy"
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-muted flex items-center justify-center">
                                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                                    </div>
                                )}
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-lg mb-2">{site.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                        <MapPin className="h-4 w-4" />
                                        {site.location}
                                    </div>
                                    {site.system_size && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                            <Zap className="h-4 w-4" />
                                            {site.system_size}
                                        </div>
                                    )}
                                    <p className="text-sm text-muted-foreground line-clamp-2">{site.description}</p>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="mt-4"
                                        onClick={() => handleDelete(site.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {sites.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No projects added yet. Click "Add Project" to get started.
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default WorkedSites;
