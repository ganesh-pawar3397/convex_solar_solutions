import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

const quotationSchema = z.object({
    // Customer Details
    customerName: z.string().min(2, "Name is required"),
    customerAddress: z.string().min(5, "Address is required"),
    customerPhone: z.string().min(10, "Valid phone number is required").max(10, "Phone must be 10 digits"),

    // System Details
    systemSize: z.string().min(1, "System size is required"),
    roofType: z.string().min(1, "Roof type is required"),

    // Cost Breakdown - must be non-negative numbers
    panelCount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1, "Must be at least 1"),
    panelPrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Must be 0 or more"),
    inverterPrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Must be 0 or more"),
    structurePrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Must be 0 or more"),
    installationPrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Must be 0 or more"),
    netMeteringPrice: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Must be 0 or more"),

    // Discount/Subsidy - must be non-negative
    subsidyAmount: z.string().optional().refine((val) => !val || (Number(val) >= 0), "Must be 0 or more"),
    discountAmount: z.string().optional().refine((val) => !val || (Number(val) >= 0), "Must be 0 or more"),
});

export type QuotationFormValues = z.infer<typeof quotationSchema>;

interface QuotationFormProps {
    onSubmit: (data: QuotationFormValues) => void;
}

const QuotationForm = ({ onSubmit }: QuotationFormProps) => {
    const form = useForm<QuotationFormValues>({
        resolver: zodResolver(quotationSchema),
        defaultValues: {
            customerName: "",
            customerAddress: "",
            customerPhone: "",
            systemSize: "3",
            roofType: "Flat",
            panelCount: "6",
            panelPrice: "85000",
            inverterPrice: "45000",
            structurePrice: "15000",
            installationPrice: "10000",
            netMeteringPrice: "5000",
            subsidyAmount: "0",
            discountAmount: "0",
        },
    });

    const { watch } = form;
    const values = watch();

    // Calculate totals for preview
    const calculateTotal = () => {
        const panels = Number(values.panelPrice) || 0;
        const inverter = Number(values.inverterPrice) || 0;
        const structure = Number(values.structurePrice) || 0;
        const installation = Number(values.installationPrice) || 0;
        const metering = Number(values.netMeteringPrice) || 0;
        const subtotal = panels + inverter + structure + installation + metering;

        const subsidy = Number(values.subsidyAmount) || 0;
        const discount = Number(values.discountAmount) || 0;

        return subtotal - subsidy - discount;
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Customer Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="customerName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Customer Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ganesh Pawar" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customerAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Savedi, Ahmednagar" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customerPhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+91 98765 43210" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* System Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>System Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="systemSize"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>System Size (kW)</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select size" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1">1 kW</SelectItem>
                                                    <SelectItem value="2">2 kW</SelectItem>
                                                    <SelectItem value="3">3 kW</SelectItem>
                                                    <SelectItem value="5">5 kW</SelectItem>
                                                    <SelectItem value="8">8 kW</SelectItem>
                                                    <SelectItem value="10">10 kW</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="roofType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Roof Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Flat">Flat RCC</SelectItem>
                                                    <SelectItem value="Tiled">Tiled / Sloping</SelectItem>
                                                    <SelectItem value="Metal">Metal Shed</SelectItem>
                                                    <SelectItem value="Ground">Ground Mount</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="panelCount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of Panels</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Financial Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pricing Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <FormField control={form.control} name="panelPrice" render={({ field }) => (
                                <FormItem><FormLabel>Panels Cost (₹)</FormLabel><FormControl><Input type="number" min="0" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="inverterPrice" render={({ field }) => (
                                <FormItem><FormLabel>Inverter Cost (₹)</FormLabel><FormControl><Input type="number" min="0" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="structurePrice" render={({ field }) => (
                                <FormItem><FormLabel>Structure Cost (₹)</FormLabel><FormControl><Input type="number" min="0" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="installationPrice" render={({ field }) => (
                                <FormItem><FormLabel>Installation & Wiring (₹)</FormLabel><FormControl><Input type="number" min="0" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="netMeteringPrice" render={({ field }) => (
                                <FormItem><FormLabel>Net Metering & Liaisoning (₹)</FormLabel><FormControl><Input type="number" min="0" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>

                        <Separator className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <FormField control={form.control} name="subsidyAmount" render={({ field }) => (
                                <FormItem><FormLabel>Subsidy Amount (₹)</FormLabel><FormControl><Input type="number" min="0" {...field} /></FormControl><FormDescription>Approx. subsidy</FormDescription><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="discountAmount" render={({ field }) => (
                                <FormItem><FormLabel>Additional Discount (₹)</FormLabel><FormControl><Input type="number" min="0" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>

                        <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                            <div className="text-lg font-semibold">Total Project Cost</div>
                            <div className="text-2xl font-bold text-primary">₹ {calculateTotal().toLocaleString('en-IN')}</div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="submit" size="lg">Generate Quotation</Button>
                </div>
            </form>
        </Form>
    );
};

export default QuotationForm;
