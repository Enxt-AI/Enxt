"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
  text: Send,
};

interface ContactInfoItem {
  id: string;
  label: string;
  value: string;
  type: string;
  order: number;
}

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    fetch("/api/contact-info")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setContactInfo(data);
      })
      .catch((err) => console.error("Failed to load contact info:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Contact <span className="gradient-text text-violet-600">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to learn more about our AI
              solutions? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Name
                        </label>
                        <Input
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Subject
                      </label>
                      <Input
                        name="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Tell us about your project..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-violet-600 hover:bg-primary/90"
                      size="lg"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              ) : contactInfo.filter((c) => c.type !== "map").length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <p>Contact information coming soon.</p>
                </div>
              ) : (
                contactInfo
                  .filter((c) => c.type !== "map")
                  .map((info, index) => {
                    const IconComponent = iconMap[info.type] || MapPin;
                    return (
                      <motion.div
                        key={info.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <Card className="border-primary/20 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                          <CardContent className="flex items-center gap-4 p-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {info.label}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                {info.value}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
              )}

              {/* Map Section */}
              {(() => {
                const mapEntry = contactInfo.find((c) => c.type === "map");
                const addressEntry = contactInfo.find(
                  (c) => c.type === "address",
                );
                return (
                  <Card className="border-primary/20 overflow-hidden rounded-xl">
                    {mapEntry ? (
                      <figure className="aspect-video w-full">
                        <iframe
                          src={mapEntry.value}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Office Location"
                        />
                      </figure>
                    ) : (
                      <div className="aspect-video bg-linear-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
                          <p className="text-muted-foreground text-sm">
                            {addressEntry?.value || "Our Office Location"}
                          </p>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })()}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
