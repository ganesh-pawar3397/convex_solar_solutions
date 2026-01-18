import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Home, Building, Factory } from "lucide-react";
import { getProducts, Product } from "@/lib/supabaseService";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ICON_MAP: Record<string, any> = {
  "Home": Home,
  "Building": Building,
  "Factory": Factory
};

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="products" className="section-padding bg-secondary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Our Products
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose Your Solar System
          </h2>
          <p className="text-muted-foreground text-lg">
            Select the perfect solar solution for your home. All systems include premium components, professional installation, and our industry-leading 20-year warranty.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-elevated p-6 lg:p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-14 w-14 rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2 items-baseline">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="space-y-2 py-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center gap-3">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-12 w-full rounded-lg mt-4" />
              </div>
            ))}
          </div>
        ) : (
          /* Products Carousel */
          <div className="px-4 md:px-12">
            <Carousel
              opts={{
                align: "center",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className={`${products.length <= 3 ? "md:justify-center" : ""}`}>
                {products.map((product) => {
                  const Icon = ICON_MAP[product.icon] || Home;
                  return (
                    <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <div
                        className={`relative card-elevated overflow-hidden h-full flex flex-col ${product.popular ? "ring-2 ring-accent" : ""
                          }`}
                      >
                        {/* Popular Badge */}
                        {product.popular && (
                          <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-sm font-bold rounded-bl-xl z-20">
                            Most Popular
                          </div>
                        )}

                        <div className="p-6 lg:p-8 flex flex-col flex-grow">
                          {/* Icon & Name */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${product.popular ? "bg-accent/20" : "bg-primary/10"
                              }`}>
                              <Icon className={`w-7 h-7 ${product.popular ? "text-accent" : "text-primary"}`} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.subtitle}</p>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="mb-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-foreground">{product.price}</span>
                              {product.original_price && (
                                <span className="text-lg text-muted-foreground line-through">{product.original_price}</span>
                              )}
                            </div>
                            <p className="text-sm text-primary font-medium">{product.price_note}</p>
                          </div>

                          <p className="text-muted-foreground mb-6 flex-grow">{product.description}</p>

                          {/* Features */}
                          <ul className="space-y-3 mb-8">
                            {product.features?.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${product.popular ? "bg-accent/20" : "bg-primary/10"
                                  }`}>
                                  <Check className={`w-3 h-3 ${product.popular ? "text-accent" : "text-primary"}`} />
                                </div>
                                <span className="text-sm text-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {/* CTA */}
                          <Button
                            variant={product.popular ? "accent" : "outline"}
                            size="lg"
                            className="w-full mt-auto"
                            asChild
                          >
                            <a href="#contact">Get Free Quote</a>
                          </Button>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
