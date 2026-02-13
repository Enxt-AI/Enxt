'use client'

interface SolutionContactProps {
    title?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
}

export function SolutionContact({ 
    title = "Ready to Transform Your Business?", 
    description = "Book a discovery call to discuss your project.",
    ctaText = "Book Discovery Call",
    ctaLink = "https://cal.com"
}: SolutionContactProps) {
  return (
    <section id="contact" className="relative py-32 bg-card/30">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-black mb-8">{title}</h2>
        <p className="text-2xl text-muted-foreground mb-12">{description}</p>
        <a href={ctaLink} target="_blank" rel="noreferrer" className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform">
            {ctaText}
        </a>
      </div>
    </section>
  )
}
