import { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminLayoutProps {
    children: ReactNode;
}

const ADMIN_SESSION_KEY = "convex_admin_authenticated";

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Check if already authenticated in this session
        const authenticated = sessionStorage.getItem(ADMIN_SESSION_KEY);
        if (authenticated === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (password === correctPassword) {
            setIsAuthenticated(true);
            sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
            setError("");
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle>Admin Access</CardTitle>
                        <CardDescription>Enter your password to access the admin panel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    autoFocus
                                />
                            </div>
                            {error && (
                                <p className="text-sm text-destructive">{error}</p>
                            )}
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <div className="text-center">
                                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                                    ← Back to Website
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary">
            {/* Admin Header */}
            <div className="bg-background border-b">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/convex_ad" className="font-bold text-lg">
                        Convex Admin
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>
            </div>
            {children}
        </div>
    );
};

export default AdminLayout;
