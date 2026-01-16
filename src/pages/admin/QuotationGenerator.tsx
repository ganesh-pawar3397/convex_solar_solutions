import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import QuotationForm, { QuotationFormValues } from "@/components/admin/QuotationForm";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QuotationPDF from "@/components/admin/QuotationPDF";

const QuotationGenerator = () => {
    const [quotationData, setQuotationData] = useState<QuotationFormValues | null>(null);
    const [quotationNumber, setQuotationNumber] = useState<string>("");

    const generateQuotationNumber = () => {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `QTN-${year}-${random}`;
    };

    const handleFormSubmit = (data: QuotationFormValues) => {
        const qtnNumber = generateQuotationNumber();
        setQuotationNumber(qtnNumber);
        setQuotationData(data);
    };

    return (
        <div className="container mx-auto p-8">
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4">
                    <Link to="/convex_ad">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Generate Quotation</h1>
                <p className="text-muted-foreground">Create a new professional quotation for a customer.</p>
            </div>

            <div className="bg-background border rounded-lg p-6">
                <QuotationForm onSubmit={handleFormSubmit} />
            </div>

            {quotationData && (
                <div className="mt-8 p-6 border rounded-lg bg-green-50 dark:bg-green-900/20">
                    <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
                        Quotation Ready!
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        Quotation Number: <strong>{quotationNumber}</strong>
                    </p>
                    <div className="flex gap-4">
                        <PDFDownloadLink
                            document={<QuotationPDF data={quotationData} quotationNumber={quotationNumber} />}
                            fileName={`${quotationNumber}.pdf`}
                        >
                            {({ loading }) => (
                                <Button disabled={loading}>
                                    <Download className="mr-2 h-4 w-4" />
                                    {loading ? "Generating..." : "Download PDF"}
                                </Button>
                            )}
                        </PDFDownloadLink>
                        <Button variant="outline" disabled>
                            <Mail className="mr-2 h-4 w-4" /> Email to Customer (Coming Soon)
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuotationGenerator;
