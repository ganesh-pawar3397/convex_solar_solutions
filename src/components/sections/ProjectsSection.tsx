import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getWorkedSites, WorkedSite } from "@/lib/supabaseService";

const ProjectsSection = () => {
    const [projects, setProjects] = useState<WorkedSite[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            setIsLoading(true);
            const data = await getWorkedSites();
            setProjects(data);
            setIsLoading(false);
        };
        loadProjects();
    }, []);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    if (isLoading) {
        return (
            <section id="projects" className="section-padding bg-background">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <Skeleton className="h-4 w-24 mx-auto mb-4" />
                        <Skeleton className="h-10 w-64 mx-auto mb-6" />
                        <Skeleton className="h-4 w-full max-w-lg mx-auto" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 px-4 md:px-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card-elevated overflow-hidden">
                                <Skeleton className="h-56 w-full" />
                                <div className="p-6 space-y-3">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (projects.length === 0) {
        return null;
    }

    // Show 3 items on desktop, 1 on mobile
    const visibleProjects = () => {
        const result = [];
        for (let i = 0; i < Math.min(3, projects.length); i++) {
            result.push(projects[(currentIndex + i) % projects.length]);
        }
        return result;
    };

    return (
        <section id="projects" className="section-padding bg-background">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                        Our Work
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                        Completed Projects
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        See our successful solar installations across Maharashtra. Every project is a testament to our quality and commitment.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full shadow-lg bg-background hidden md:flex"
                        onClick={prev}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full shadow-lg bg-background hidden md:flex"
                        onClick={next}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-3 gap-6 px-4 md:px-8">
                        {visibleProjects().map((project, index) => (
                            <div
                                key={project.id}
                                className={`card-elevated overflow-hidden transition-all duration-300 ${index === 0 ? "block" : "hidden md:block"
                                    }`}
                            >
                                {project.image_url && (
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                        {project.system_size && (
                                            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                                                {project.system_size}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                                        <MapPin className="h-4 w-4" />
                                        {project.location}
                                    </div>
                                    <p className="text-muted-foreground text-sm line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex justify-center gap-4 mt-6 md:hidden">
                        <Button variant="outline" size="icon" onClick={prev}>
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={next}>
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "w-6 bg-primary" : "bg-border"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
