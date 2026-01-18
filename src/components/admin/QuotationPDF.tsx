import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font,
} from "@react-pdf/renderer";
import { QuotationFormValues } from "./QuotationForm";
import logo from "@/assets/logo.png";

// Register a clean font (optional, using default for now)
// Font.register({ family: 'Roboto', src: '...' });

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Helvetica",
        fontSize: 10,
        paddingBottom: 80, // Space for footer
        color: "#1e293b",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#f97316", // Orange accent
        paddingBottom: 15,
        gap: 15,
    },
    logo: {
        width: 50,
        height: 50,
        objectFit: "contain",
    },
    headerText: {
        flexDirection: "column",
    },
    companyName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1e293b",
        textTransform: "uppercase",
    },
    companyTagline: {
        fontSize: 10,
        color: "#64748b",
        fontStyle: "italic",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#0f172a",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    metaBox: {
        width: "48%",
        padding: 12,
        backgroundColor: "#f8fafc",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#e2e8f0",
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
        marginBottom: 4,
        lineHeight: 1.4,
    },
    table: {
        width: "100%",
        marginBottom: 20,
        borderRadius: 4,
        overflow: "hidden",
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#1e293b",
        color: "#ffffff",
        padding: 10,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
        padding: 10,
    },
    tableRowAlt: {
        flexDirection: "row",
        backgroundColor: "#f8fafc",
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
        padding: 10,
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
        padding: 12,
    },
    totalText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 12,
        textTransform: "uppercase",
    },
    terms: {
        marginTop: 10,
        padding: 15,
        backgroundColor: "#f8fafc",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    termsTitle: {
        fontSize: 10,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#334155",
    },
    termItem: {
        fontSize: 9,
        color: "#64748b",
        marginBottom: 4,
    },
    signatureSection: {
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    signatureBox: {
        width: "40%",
        alignItems: "center",
    },
    signatureLine: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#94a3b8",
        marginBottom: 8,
        height: 40, // Space for signature
    },
    signatureLabel: {
        fontSize: 9,
        color: "#64748b",
        textAlign: "center",
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        paddingTop: 15,
        alignItems: "center",
    },
    footerRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        marginBottom: 5,
    },
    footerText: {
        fontSize: 8,
        color: "#94a3b8",
    },
    footerHighlight: {
        color: "#f97316",
        fontWeight: "bold",
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

    const businessPhone = import.meta.env.VITE_BUSINESS_PHONE || "+91 98765 43210";
    const businessEmail = import.meta.env.VITE_BUSINESS_EMAIL || "info@convexsolar.com";
    const businessAddress = import.meta.env.VITE_BUSINESS_ADDRESS || "123 Green Energy Park, Andheri East, Mumbai";

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
                    <Image src={logo} style={styles.logo} />
                    <View style={styles.headerText}>
                        <Text style={styles.companyName}>Convex Solar Solutions</Text>
                        <Text style={styles.companyTagline}>
                            Illuminate your energetic life
                        </Text>
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>Quotation For Solar Rooftop System</Text>

                {/* Meta Info */}
                <View style={styles.metaRow}>
                    <View style={styles.metaBox}>
                        <Text style={styles.sectionTitle}>To</Text>
                        <Text style={[styles.text, { fontWeight: 'bold', fontSize: 11 }]}>{data.customerName}</Text>
                        <Text style={styles.text}>{data.customerAddress}</Text>
                        <Text style={styles.text}>{data.customerPhone}</Text>
                    </View>
                    <View style={styles.metaBox}>
                        <Text style={styles.sectionTitle}>Quotation Details</Text>
                        <Text style={styles.text}>Quotation No: <Text style={{ fontWeight: 'bold' }}>{quotationNumber}</Text></Text>
                        <Text style={styles.text}>Date: {today}</Text>
                        <Text style={styles.text}>Grid Type: {data.systemType || "On-Grid"}</Text>
                        <Text style={styles.text}>System Size: {data.systemSize} kW</Text>
                    </View>
                </View>

                {/* Project Details */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.sectionTitle}>Technical Specifications</Text>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Text style={[styles.text, { backgroundColor: '#f0f9ff', padding: 5, borderRadius: 4 }]}>
                            Panels: {data.panelCount} Nos
                        </Text>
                        <Text style={[styles.text, { backgroundColor: '#f0f9ff', padding: 5, borderRadius: 4 }]}>
                            Roof Type: {data.roofType}
                        </Text>
                    </View>
                </View>

                {/* Cost Breakdown Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.col1, { color: "#fff", fontWeight: "bold" }]}>Description</Text>
                        <Text style={[styles.col2, { color: "#fff", fontWeight: "bold" }]}>Amount (₹)</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.col1}>Solar PV Modules (Panels)</Text>
                        <Text style={styles.col2}>{formatCurrency(panels)}</Text>
                    </View>
                    <View style={styles.tableRowAlt}>
                        <Text style={styles.col1}>Solar Inverter</Text>
                        <Text style={styles.col2}>{formatCurrency(inverter)}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.col1}>Module Mounting Structure</Text>
                        <Text style={styles.col2}>{formatCurrency(structure)}</Text>
                    </View>
                    <View style={styles.tableRowAlt}>
                        <Text style={styles.col1}>Installation, Testing & Commissioning</Text>
                        <Text style={styles.col2}>{formatCurrency(installation)}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.col1}>Net Metering & Official Approvals</Text>
                        <Text style={styles.col2}>{formatCurrency(metering)}</Text>
                    </View>

                    <View style={[styles.tableRowAlt, { borderTopWidth: 2, borderTopColor: '#cbd5e1' }]}>
                        <Text style={[styles.col1, { fontWeight: "bold" }]}>Subtotal</Text>
                        <Text style={[styles.col2, { fontWeight: "bold" }]}>
                            {formatCurrency(subtotal)}
                        </Text>
                    </View>

                    {subsidy > 0 && (
                        <View style={styles.tableRow}>
                            <Text style={[styles.col1, { color: "#16a34a" }]}>
                                Less: PM Surya Ghar Subsidy
                            </Text>
                            <Text style={[styles.col2, { color: "#16a34a" }]}>
                                - {formatCurrency(subsidy)}
                            </Text>
                        </View>
                    )}
                    {discount > 0 && (
                        <View style={styles.tableRowAlt}>
                            <Text style={[styles.col1, { color: "#2563eb" }]}>
                                Less: Special Discount
                            </Text>
                            <Text style={[styles.col2, { color: "#2563eb" }]}>
                                - {formatCurrency(discount)}
                            </Text>
                        </View>
                    )}
                    <View style={styles.totalRow}>
                        <Text style={[styles.col1, styles.totalText]}>GRAND TOTAL</Text>
                        <Text style={[styles.col2, styles.totalText]}>
                            {formatCurrency(total)}
                        </Text>
                    </View>
                </View>

                {/* Terms */}
                <View style={styles.terms}>
                    <Text style={styles.termsTitle}>Terms & Conditions</Text>
                    <Text style={styles.termItem}>• Payment: 50% advance along with work order, balance 50% after installation.</Text>
                    <Text style={styles.termItem}>• Warranty: 25 years performance warranty on Solar Panels.</Text>
                    <Text style={styles.termItem}>• Warranty: 5-year manufacturer warranty on Inverter.</Text>
                    <Text style={styles.termItem}>• Installation timeline is subject to site clearance and approvals.</Text>
                    <Text style={styles.termItem}>• Prices are valid for 15 days from the date of quotation.</Text>
                </View>

                {/* Signatures */}
                <View style={styles.signatureSection}>
                    <View style={styles.signatureBox}>
                        <View style={styles.signatureLine} />
                        <Text style={styles.signatureLabel}>Customer Acceptance</Text>
                    </View>
                    <View style={styles.signatureBox}>
                        <View style={styles.signatureLine} />
                        <Text style={styles.signatureLabel}>Authorized Signatory</Text>
                        <Text style={[styles.signatureLabel, { fontWeight: 'bold', marginTop: 2 }]}>Convex Solar Solutions</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <View style={styles.footerRow}>
                        <Text style={styles.footerText}>
                            Web: <Text style={{ color: '#000' }}>www.convexsolar.in</Text>
                        </Text>
                        <Text style={styles.footerText}>|</Text>
                        <Text style={styles.footerText}>
                            Email: <Text style={{ color: '#000' }}>{businessEmail}</Text>
                        </Text>
                        <Text style={styles.footerText}>|</Text>
                        <Text style={styles.footerText}>
                            Phone: <Text style={{ color: '#000' }}>{businessPhone}</Text>
                        </Text>
                    </View>
                    <Text style={[styles.footerText, { textAlign: 'center' }]}>
                        {businessAddress}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default QuotationPDF;
