import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, MapPin, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getTestimonials, Testimonial } from "@/lib/supabaseService";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      setIsLoading(true);
      const data = await getTestimonials();
      setTestimonials(data);
      setIsLoading(false);
    };
    loadTestimonials();
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (isLoading) {
    return (
      <section id="testimonials" className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Skeleton className="h-4 w-32 mx-auto mb-4" />
            <Skeleton className="h-10 w-72 mx-auto mb-6" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="card-elevated p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-6 items-start px-8">
                <Skeleton className="w-20 h-20 rounded-full flex-shrink-0" />
                <div className="space-y-4 w-full">
                  <Skeleton className="h-5 w-32" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="pt-2">
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-14 h-14 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Customer Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="card-elevated p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/20" />

            {/* Navigation */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
              onClick={prev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
              onClick={next}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            <div className="flex flex-col md:flex-row gap-6 items-start px-8">
              {current.image_url ? (
                <img
                  src={current.image_url}
                  alt={current.customer_name}
                  loading="lazy"
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl flex-shrink-0">
                  {current.customer_name.charAt(0)}
                </div>
              )}
              <div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < current.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-foreground text-lg md:text-xl leading-relaxed mb-6">
                  "{current.review}"
                </p>
                <div>
                  <h4 className="font-bold text-foreground">{current.customer_name}</h4>
                  {current.location && (
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="h-3 w-3" />
                      {current.location}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "w-6 bg-primary" : "bg-border"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-14 h-14 rounded-full overflow-hidden transition-all ${index === currentIndex
                  ? "ring-4 ring-primary scale-110"
                  : "opacity-60 hover:opacity-100"
                  }`}
              >
                {testimonial.image_url ? (
                  <img
                    src={testimonial.image_url}
                    alt={testimonial.customer_name}
                    loading="lazy"
                    className="w-14 h-14 object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {testimonial.customer_name.charAt(0)}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
