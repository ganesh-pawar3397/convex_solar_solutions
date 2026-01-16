import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Image, MessageSquare, ArrowRight, Inbox } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website content</p>
        </div>
        <Button asChild>
          <Link to="/convex_ad/quotations/new">
            <Plus className="mr-2 h-4 w-4" /> New Quotation
          </Link>
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/convex_ad/products">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Products</CardTitle>
              <FileText className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage your solar packages and pricing
              </p>
              <div className="flex items-center text-primary text-sm font-medium">
                Manage Products <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/convex_ad/quotations/new">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Quotations</CardTitle>
              <FileText className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Generate professional PDF quotations for customers
              </p>
              <div className="flex items-center text-primary text-sm font-medium">
                Create New <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/convex_ad/worked-sites">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Worked Sites</CardTitle>
              <Image className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Showcase your completed solar installations
              </p>
              <div className="flex items-center text-primary text-sm font-medium">
                Manage Projects <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/convex_ad/testimonials">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Testimonials</CardTitle>
              <MessageSquare className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage customer reviews and feedback
              </p>
              <div className="flex items-center text-primary text-sm font-medium">
                Manage Reviews <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/convex_ad/inquiries">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Inquiries</CardTitle>
              <Inbox className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View and manage customer inquiries
              </p>
              <div className="flex items-center text-primary text-sm font-medium">
                View Inquiries <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Website Link */}
      <div className="border rounded-lg p-6 bg-muted/20">
        <h2 className="text-lg font-semibold mb-2">View Website</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Preview how your content appears on the public website
        </p>
        <Button variant="outline" asChild>
          <Link to="/" target="_blank">
            Open Website <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
