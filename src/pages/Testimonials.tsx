import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Quote, Star, MessageSquareQuote } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    content: "YessBangal transformed our online presence completely. Their attention to detail and innovative approach exceeded our expectations. The team was professional and delivered on time.",
    rating: 5,
    image: "/placeholder.svg",
  },
  {
    name: "Michael Chen",
    role: "Founder, GrowthLabs",
    content: "Working with YessBangal was a game-changer for our startup. They understood our vision and delivered a product that perfectly matched our needs. Highly recommended!",
    rating: 5,
    image: "/placeholder.svg",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director, BrandCo",
    content: "The team's creativity and technical expertise are unmatched. They created a stunning website that has significantly improved our conversion rates and user engagement.",
    rating: 5,
    image: "/placeholder.svg",
  },
  {
    name: "David Thompson",
    role: "COO, FinanceHub",
    content: "Professional, reliable, and incredibly talented. YessBangal delivered our complex fintech platform ahead of schedule with all the features we requested and more.",
    rating: 5,
    image: "/placeholder.svg",
  },
  {
    name: "Lisa Park",
    role: "Owner, StyleBoutique",
    content: "Our e-commerce site has never looked better! Sales have increased by 40% since the redesign. The team was responsive and made the entire process seamless.",
    rating: 5,
    image: "/placeholder.svg",
  },
  {
    name: "James Wilson",
    role: "CTO, DataDrive",
    content: "The mobile app they developed for us is flawless. The UI/UX design is intuitive, and the performance is exceptional. We've received amazing feedback from our users.",
    rating: 5,
    image: "/placeholder.svg",
  },
  {
    name: "Amanda Foster",
    role: "Director, HealthPlus",
    content: "YessBangal understood the healthcare industry requirements perfectly. They built a HIPAA-compliant platform that our patients love to use.",
    rating: 5,
    image: "/placeholder.svg",
  },
  {
    name: "Robert Kim",
    role: "Founder, EduLearn",
    content: "From concept to launch, the team guided us every step of the way. Our e-learning platform is now serving thousands of students thanks to their excellent work.",
    rating: 4,
    image: "/placeholder.svg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="pt-32 pb-20 bg-accent relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <MessageSquareQuote className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Client Reviews</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Client <span className="text-primary">Testimonials</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed">
                Don't just take our word for it. See what our clients have to say about working with us and the results we've delivered.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-4 h-full bg-card/50 backdrop-blur-xl border-white/10 hover:border-primary/50 transition-all flex flex-col">
                    {/* Quote Icon */}
                    <Quote className="w-6 h-6 text-primary/50 mb-2" />
                    
                    {/* Rating */}
                    <div className="flex gap-1 mb-2">
                      {Array(testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-primary text-primary"
                          />
                        ))}
                      {Array(5 - testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 text-white/30"
                          />
                        ))}
                    </div>

                    {/* Content */}
                    <p className="text-white/80 flex-grow mb-3 leading-relaxed text-sm line-clamp-3">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-semibold text-base">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-white/60">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;
