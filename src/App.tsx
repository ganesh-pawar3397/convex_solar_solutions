import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load admin pages - they only load when user visits /convex_ad
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const QuotationGenerator = lazy(() => import("./pages/admin/QuotationGenerator"));
const WorkedSites = lazy(() => import("./pages/admin/WorkedSites"));
const Testimonials = lazy(() => import("./pages/admin/Testimonials"));
const Products = lazy(() => import("./pages/admin/Products"));
const Inquiries = lazy(() => import("./pages/admin/Inquiries"));

const queryClient = new QueryClient();

// Loading fallback for lazy components
const AdminLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-secondary">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground">Loading admin panel...</p>
    </div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Admin Routes - Lazy loaded with Suspense */}
            <Route path="/convex_ad" element={
              <Suspense fallback={<AdminLoading />}>
                <AdminLayout><AdminDashboard /></AdminLayout>
              </Suspense>
            } />
            <Route path="/convex_ad/quotations/new" element={
              <Suspense fallback={<AdminLoading />}>
                <AdminLayout><QuotationGenerator /></AdminLayout>
              </Suspense>
            } />
            <Route path="/convex_ad/worked-sites" element={
              <Suspense fallback={<AdminLoading />}>
                <AdminLayout><WorkedSites /></AdminLayout>
              </Suspense>
            } />
            <Route path="/convex_ad/testimonials" element={
              <Suspense fallback={<AdminLoading />}>
                <AdminLayout><Testimonials /></AdminLayout>
              </Suspense>
            } />
            <Route path="/convex_ad/products" element={
              <Suspense fallback={<AdminLoading />}>
                <AdminLayout><Products /></AdminLayout>
              </Suspense>
            } />
            <Route path="/convex_ad/inquiries" element={
              <Suspense fallback={<AdminLoading />}>
                <AdminLayout><Inquiries /></AdminLayout>
              </Suspense>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
