import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getWorkedSites, WorkedSite } from "@/lib/supabaseService";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const ProjectsSection = () => {
    const [projects, setProjects] = useState<WorkedSite[]>([]);
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
                <div className="px-4 md:px-12">
                    <Carousel
                        opts={{
                            align: "center",
                            loop: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className={`${projects.length <= 3 ? "md:justify-center" : ""}`}>
                            {projects.map((project) => (
                                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                                    <div className="card-elevated overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl">
                                        {project.image_url && (
                                            <div className="relative h-56 overflow-hidden shrink-0">
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
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-foreground mb-2">
                                                {project.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                                                <MapPin className="h-4 w-4 shrink-0" />
                                                {project.location}
                                            </div>
                                            <p className="text-muted-foreground text-sm line-clamp-2 flex-grow">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
