import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonicalUrl?: string;
    ogImage?: string;
}

const SEO = ({
    title,
    description,
    keywords,
    canonicalUrl = "https://convexsolar.com",
    ogImage = "/og-image.jpg"
}: SEOProps) => {
    const siteTitle = "Convex Solar Solutions";
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Best Solar Panel Installation in Mumbai`;
    const metaDescription = description || "Expert solar panel installation, maintenance, and consulting in Mumbai. Save electricity bills with Convex Solar Solutions. Get a free quote today!";
    const metaKeywords = keywords || "solar panel installation, solar energy mumbai, rooftop solar, solar subsidy maharashtra, commercial solar, residential solar, convex solar";

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={ogImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={ogImage} />

            {/* Local Business Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": "Convex Solar Solutions",
                    "image": `${canonicalUrl}${ogImage}`,
                    "telephone": import.meta.env.VITE_BUSINESS_PHONE ? `+${import.meta.env.VITE_BUSINESS_PHONE}` : "+919876543210",
                    "email": import.meta.env.VITE_BUSINESS_EMAIL || "info@convexsolar.com",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": import.meta.env.VITE_BUSINESS_ADDRESS || "Andheri East",
                        "addressLocality": "Mumbai",
                        "addressRegion": "Maharashtra",
                        "postalCode": "400069",
                        "addressCountry": "IN"
                    },
                    "url": canonicalUrl,
                    "priceRange": "₹₹",
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday"
                        ],
                        "opens": "09:00",
                        "closes": "19:00"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
