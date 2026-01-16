import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Trash2, Phone, Mail, MapPin, Calendar, Zap, Loader2, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { getInquiries, updateInquiryStatus, deleteInquiry, subscribeToInquiries, Inquiry } from "@/lib/supabaseService";
import { useToast } from "@/hooks/use-toast";

const statusColors = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    converted: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
};

const Inquiries = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRealtime, setIsRealtime] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        // Initial load
        const loadData = async () => {
            setIsLoading(true);
            const data = await getInquiries();
            setInquiries(data);
            setIsLoading(false);
        };
        loadData();

        // Subscribe to real-time updates
        const unsubscribe = subscribeToInquiries((newInquiries) => {
            setInquiries(newInquiries);
            setIsRealtime(true);
            toast({ title: "Updated", description: "New inquiry received!" });
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleStatusChange = async (id: string, status: Inquiry["status"]) => {
        await updateInquiryStatus(id, status);
        const data = await getInquiries();
        setInquiries(data);
        toast({ title: "Status Updated" });
    };

    const handleDelete = async (id: string) => {
        await deleteInquiry(id);
        const data = await getInquiries();
        setInquiries(data);
        toast({ title: "Inquiry Deleted" });
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
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
                        <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            {inquiries.filter(i => i.status === "new").length} new inquiries
                            {isRealtime && (
                                <span className="inline-flex items-center gap-1 text-xs text-green-600">
                                    <Wifi className="h-3 w-3" /> Live
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : inquiries.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground border rounded-lg">
                    No inquiries yet. They will appear here when customers submit the contact form.
                </div>
            ) : (
                <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                        <Card key={inquiry.id} className="overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                    {/* Customer Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-lg font-semibold">{inquiry.name}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[inquiry.status]}`}>
                                                {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                                            </span>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                <a href={`tel:${inquiry.phone}`} className="hover:text-primary">{inquiry.phone}</a>
                                            </div>
                                            {inquiry.email && (
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4" />
                                                    <a href={`mailto:${inquiry.email}`} className="hover:text-primary">{inquiry.email}</a>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                {inquiry.location}{inquiry.address && ` - ${inquiry.address}`}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Zap className="h-4 w-4" />
                                                {inquiry.energy_needs || "Not specified"}
                                            </div>
                                        </div>

                                        {inquiry.message && (
                                            <p className="text-sm text-foreground bg-muted p-3 rounded-lg">
                                                "{inquiry.message}"
                                            </p>
                                        )}

                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                                            <Calendar className="h-3 w-3" />
                                            {formatDate(inquiry.created_at)}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <Select
                                            value={inquiry.status}
                                            onValueChange={(value) => handleStatusChange(inquiry.id, value as Inquiry["status"])}
                                        >
                                            <SelectTrigger className="w-32">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="new">New</SelectItem>
                                                <SelectItem value="contacted">Contacted</SelectItem>
                                                <SelectItem value="converted">Converted</SelectItem>
                                                <SelectItem value="closed">Closed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button variant="destructive" size="icon" onClick={() => handleDelete(inquiry.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Inquiries;
