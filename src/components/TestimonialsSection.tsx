
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

const testimonials = [
  {
    content: "FlexiBene has revolutionized our benefits program. Our employees love the flexibility, and we've seen a significant boost in satisfaction scores across the board.",
    author: "Sarah Johnson",
    position: "HR Director",
    company: "TechStream Inc.",
    avatar: "/placeholder.svg"
  },
  {
    content: "The platform is incredibly easy to use and has dramatically reduced our administrative workload. Implementation was smooth, and the support team is always responsive.",
    author: "Michael Chen",
    position: "Chief People Officer",
    company: "Growth Ventures",
    avatar: "/placeholder.svg"
  },
  {
    content: "As a growing startup, we needed a benefits solution that would scale with us and help us compete for talent. FlexiBene has been the perfect fit, and our team loves it.",
    author: "Elena Rodriguez",
    position: "Founder & CEO",
    company: "Novus Studios",
    avatar: "/placeholder.svg"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    const elements = sectionRef.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-brand-50 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-brand-200 rounded-full opacity-30 blur-3xl"></div>
        <MessageSquare className="absolute top-20 left-20 w-24 h-24 text-brand-100/20 transform -rotate-12" />
        <MessageSquare className="absolute bottom-40 right-40 w-16 h-16 text-brand-100/20 transform rotate-12" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium text-brand-700 bg-brand-100 rounded-full reveal-on-scroll">
            Testimonials
          </span>
          <h2 className="mb-6 text-gray-900 reveal-on-scroll">What Our Customers Say</h2>
          <p className="text-gray-600 reveal-on-scroll">
            Don't just take our word for it. Here's what HR leaders and executives say about our platform.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden reveal-on-scroll">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 p-4"
                >
                  <div className="bg-white rounded-xl p-8 shadow-lg">
                    <div className="mb-6">
                      <div className="flex space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-5 h-5 text-yellow-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg italic leading-relaxed">"{testimonial.content}"</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-brand-100 rounded-full mr-4 flex items-center justify-center">
                        <span className="text-brand-600 font-medium">{testimonial.author.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.author}</h4>
                        <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2 reveal-on-scroll">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  currentIndex === index ? "bg-brand-500" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
