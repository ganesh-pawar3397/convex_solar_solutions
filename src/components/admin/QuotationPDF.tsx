import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import { QuotationFormValues } from "./QuotationForm";

// Register a clean font (optional, using default for now)
// Font.register({ family: 'Roboto', src: '...' });

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Helvetica",
        fontSize: 10,
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#f97316", // Orange accent
        paddingBottom: 15,
    },
    companyName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1e293b",
    },
    companyTagline: {
        fontSize: 9,
        color: "#64748b",
        marginTop: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
        color: "#0f172a",
    },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    metaBox: {
        width: "48%",
        padding: 10,
        backgroundColor: "#f8fafc",
        borderRadius: 4,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#334155",
        textTransform: "uppercase",
    },
    text: {
        fontSize: 10,
        color: "#475569",
        marginBottom: 3,
    },
    table: {
        width: "100%",
        marginVertical: 15,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#1e293b",
        color: "#ffffff",
        padding: 8,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
        padding: 8,
    },
    tableRowAlt: {
        flexDirection: "row",
        backgroundColor: "#f8fafc",
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
        padding: 8,
    },
    col1: {
        width: "60%",
    },
    col2: {
        width: "40%",
        textAlign: "right",
    },
    totalRow: {
        flexDirection: "row",
        backgroundColor: "#f97316",
        padding: 10,
        marginTop: 5,
    },
    totalText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 12,
    },
    terms: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#f8fafc",
        borderRadius: 4,
    },
    termsTitle: {
        fontSize: 10,
        fontWeight: "bold",
        marginBottom: 5,
    },
    termItem: {
        fontSize: 8,
        color: "#64748b",
        marginBottom: 2,
    },
    footer: {
        position: "absolute",
        bottom: 40,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    signatureBox: {
        width: "45%",
    },
    signatureLine: {
        borderBottomWidth: 1,
        borderBottomColor: "#94a3b8",
        marginBottom: 5,
        marginTop: 30,
    },
    signatureLabel: {
        fontSize: 8,
        color: "#64748b",
    },
});

interface QuotationPDFProps {
    data: QuotationFormValues;
    quotationNumber: string;
}

const QuotationPDF = ({ data, quotationNumber }: QuotationPDFProps) => {
    const today = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const panels = Number(data.panelPrice) || 0;
    const inverter = Number(data.inverterPrice) || 0;
    const structure = Number(data.structurePrice) || 0;
    const installation = Number(data.installationPrice) || 0;
    const metering = Number(data.netMeteringPrice) || 0;
    const subtotal = panels + inverter + structure + installation + metering;
    const subsidy = Number(data.subsidyAmount) || 0;
    const discount = Number(data.discountAmount) || 0;
    const total = subtotal - subsidy - discount;

    const formatCurrency = (amount: number) =>
        `₹ ${amount.toLocaleString("en-IN")}`;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.companyName}>Convex Solar Solutions</Text>
                    <Text style={styles.companyTagline}>
                        Powering Homes with Clean Energy
                    </Text>
                </View>

                {/* Title */}
                <Text style={styles.title}>SOLAR ROOFTOP QUOTATION</Text>

                {/* Meta Info */}
                <View style={styles.metaRow}>
                    <View style={styles.metaBox}>
                        <Text style={styles.sectionTitle}>Quotation Details</Text>
                        <Text style={styles.text}>Number: {quotationNumber}</Text>
                        <Text style={styles.text}>Date: {today}</Text>
                        <Text style={styles.text}>Valid Until: 30 days from issue</Text>
                    </View>
                    <View style={styles.metaBox}>
                        <Text style={styles.sectionTitle}>Customer Details</Text>
                        <Text style={styles.text}>{data.customerName}</Text>
                        <Text style={styles.text}>{data.customerAddress}</Text>
                        <Text style={styles.text}>Ph: {data.customerPhone}</Text>
                    </View>
                </View>

                {/* Project Details */}
                <View style={{ marginBottom: 15 }}>
                    <Text style={styles.sectionTitle}>Project Specifications</Text>
                    <Text style={styles.text}>System Capacity: {data.systemSize} kW</Text>
                    <Text style={styles.text}>Roof Type: {data.roofType}</Text>
                    <Text style={styles.text}>Number of Panels: {data.panelCount}</Text>
                </View>

                {/* Cost Breakdown Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.col1, { color: "#fff" }]}>Description</Text>
                        <Text style={[styles.col2, { color: "#fff" }]}>Amount</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.col1}>Solar Panels ({data.panelCount} nos)</Text>
                        <Text style={styles.col2}>{formatCurrency(panels)}</Text>
                    </View>
                    <View style={styles.tableRowAlt}>
                        <Text style={styles.col1}>Solar Inverter</Text>
                        <Text style={styles.col2}>{formatCurrency(inverter)}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.col1}>Mounting Structure</Text>
                        <Text style={styles.col2}>{formatCurrency(structure)}</Text>
                    </View>
                    <View style={styles.tableRowAlt}>
                        <Text style={styles.col1}>Installation & Wiring</Text>
                        <Text style={styles.col2}>{formatCurrency(installation)}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.col1}>Net Metering & Approval</Text>
                        <Text style={styles.col2}>{formatCurrency(metering)}</Text>
                    </View>
                    <View style={styles.tableRowAlt}>
                        <Text style={[styles.col1, { fontWeight: "bold" }]}>Subtotal</Text>
                        <Text style={[styles.col2, { fontWeight: "bold" }]}>
                            {formatCurrency(subtotal)}
                        </Text>
                    </View>
                    {subsidy > 0 && (
                        <View style={styles.tableRow}>
                            <Text style={[styles.col1, { color: "#16a34a" }]}>
                                Government Subsidy (-)
                            </Text>
                            <Text style={[styles.col2, { color: "#16a34a" }]}>
                                {formatCurrency(subsidy)}
                            </Text>
                        </View>
                    )}
                    {discount > 0 && (
                        <View style={styles.tableRowAlt}>
                            <Text style={[styles.col1, { color: "#2563eb" }]}>
                                Additional Discount (-)
                            </Text>
                            <Text style={[styles.col2, { color: "#2563eb" }]}>
                                {formatCurrency(discount)}
                            </Text>
                        </View>
                    )}
                    <View style={styles.totalRow}>
                        <Text style={[styles.col1, styles.totalText]}>TOTAL PAYABLE</Text>
                        <Text style={[styles.col2, styles.totalText]}>
                            {formatCurrency(total)}
                        </Text>
                    </View>
                </View>

                {/* Terms */}
                <View style={styles.terms}>
                    <Text style={styles.termsTitle}>Terms & Conditions</Text>
                    <Text style={styles.termItem}>
                        1. Payment: 50% advance, 50% on installation completion.
                    </Text>
                    <Text style={styles.termItem}>
                        2. Warranty: 25 years on panels, 5 years on inverter.
                    </Text>
                    <Text style={styles.termItem}>
                        3. Installation timeline: 7-10 working days after advance.
                    </Text>
                    <Text style={styles.termItem}>
                        4. Prices are subject to change without prior notice.
                    </Text>
                    <Text style={styles.termItem}>
                        5. Subsidy disbursement subject to government approval.
                    </Text>
                </View>

                {/* Footer / Signature */}
                <View style={styles.footer}>
                    <View style={styles.signatureBox}>
                        <View style={styles.signatureLine} />
                        <Text style={styles.signatureLabel}>Customer Signature</Text>
                    </View>
                    <View style={styles.signatureBox}>
                        <View style={styles.signatureLine} />
                        <Text style={styles.signatureLabel}>
                            For Convex Solar Solutions
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default QuotationPDF;
