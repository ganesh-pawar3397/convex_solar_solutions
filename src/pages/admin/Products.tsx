import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Home, Building, Factory, Loader2, Check, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { getProducts, addProduct, updateProduct, deleteProduct, Product } from "@/lib/supabaseService";
import { useToast } from "@/hooks/use-toast";

const ICON_MAP: Record<string, any> = {
    "Home": Home,
    "Building": Building,
    "Factory": Factory
};

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: "",
        subtitle: "",
        price: "",
        original_price: "",
        price_note: "",
        description: "",
        features: "", // Comma or newline separated
        icon: "Home",
        popular: false,
    });

    const loadProducts = async () => {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.price) {
            toast({ title: "Error", description: "Name and Price are required", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);
        try {
            // Convert features string to array
            const featuresArray = formData.features
                .split("\n")
                .map(f => f.trim())
                .filter(f => f.length > 0);

            const productData = {
                name: formData.name,
                subtitle: formData.subtitle,
                price: formData.price,
                original_price: formData.original_price || null,
                price_note: formData.price_note || null,
                description: formData.description || null,
                features: featuresArray,
                icon: formData.icon,
                popular: formData.popular,
                display_order: editingProduct ? editingProduct.display_order : products.length + 1
            };

            if (editingProduct) {
                await updateProduct(editingProduct.id, productData);
                toast({ title: "Success", description: "Product updated successfully!" });
            } else {
                await addProduct(productData);
                toast({ title: "Success", description: "Product added successfully!" });
            }

            await loadProducts();
            resetForm();
            setShowForm(false);
        } catch (error) {
            toast({ title: "Error", description: `Failed to ${editingProduct ? 'update' : 'add'} product`, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            subtitle: "",
            price: "",
            original_price: "",
            price_note: "",
            description: "",
            features: "",
            icon: "Home",
            popular: false,
        });
        setEditingProduct(null);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            subtitle: product.subtitle || "",
            price: product.price,
            original_price: product.original_price || "",
            price_note: product.price_note || "",
            description: product.description || "",
            features: product.features?.join("\n") || "",
            icon: product.icon,
            popular: product.popular,
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        await deleteProduct(id);
        await loadProducts();
        toast({ title: "Deleted", description: "Product removed." });
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
                        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                        <p className="text-muted-foreground">Manage your solar system packages</p>
                    </div>
                    <Button onClick={() => {
                        resetForm();
                        setShowForm(!showForm);
                    }}>
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </div>
            </div>

            {/* Add Form */}
            {showForm && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Product Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. 5kW System"
                                />
                            </div>
                            <div>
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Input
                                    id="subtitle"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    placeholder="e.g. Best for Medium Homes"
                                />
                            </div>
                            <div>
                                <Label htmlFor="price">Price *</Label>
                                <Input
                                    id="price"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="e.g. ₹2,20,000"
                                />
                            </div>
                            <div>
                                <Label htmlFor="original_price">Original Price</Label>
                                <Input
                                    id="original_price"
                                    value={formData.original_price}
                                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                                    placeholder="e.g. ₹3,50,000"
                                />
                            </div>
                            <div>
                                <Label htmlFor="price_note">Price Note</Label>
                                <Input
                                    id="price_note"
                                    value={formData.price_note}
                                    onChange={(e) => setFormData({ ...formData, price_note: e.target.value })}
                                    placeholder="e.g. After Subsidy"
                                />
                            </div>
                            <div>
                                <Label htmlFor="icon">Icon</Label>
                                <select
                                    id="icon"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                >
                                    <option value="Home">Home</option>
                                    <option value="Building">Building</option>
                                    <option value="Factory">Factory</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief description..."
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="features">Features (One per line)</Label>
                                <Textarea
                                    id="features"
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    placeholder="12-15 solar panels&#10;Monthly savings: ₹4,000&#10;Free installation"
                                    rows={5}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="popular"
                                    checked={formData.popular}
                                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Label htmlFor="popular">Mark as Popular / Featured</Label>
                            </div>

                            <div className="md:col-span-2 flex gap-2 pt-4">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {editingProduct ? "Update Product" : "Save Product"}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => {
                                    setShowForm(false);
                                    resetForm();
                                }}>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => {
                        const Icon = ICON_MAP[product.icon] || Home;
                        return (
                            <div
                                key={product.id}
                                className={`relative border rounded-xl overflow-hidden bg-card text-card-foreground shadow-sm ${product.popular ? "ring-2 ring-primary" : ""
                                    }`}
                            >
                                {product.popular && (
                                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                                        Popular
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">{product.name}</h3>
                                            <p className="text-xs text-muted-foreground">{product.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold">{product.price}</span>
                                            {product.original_price && (
                                                <span className="text-sm text-muted-foreground line-through">{product.original_price}</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-primary font-medium">{product.price_note}</p>
                                    </div>
                                    <ul className="space-y-2 mb-6">
                                        {product.features?.slice(0, 3).map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Check className="w-3 h-3 text-primary" />
                                                <span className="truncate">{feature}</span>
                                            </li>
                                        ))}
                                        {product.features?.length > 3 && (
                                            <li className="text-xs text-muted-foreground pl-5">+ {product.features.length - 3} more features</li>
                                        )}
                                    </ul>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(product)}
                                    >
                                        <Edit className="h-4 w-4 mr-2" /> Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Products;
