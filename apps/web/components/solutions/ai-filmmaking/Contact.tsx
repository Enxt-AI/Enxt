'use client'

export function Contact() {
  return (
    <section id="contact" className="relative py-32 bg-card/30">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-black mb-8">Ready to Light Up the Screen?</h2>
        <p className="text-2xl text-muted-foreground mb-12">Book a discovery call to discuss your project.</p>
        <a href="https://cal.com" target="_blank" rel="noreferrer" className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform">
            Book Discovery Call
        </a>
      </div>
    </section>
  )
}
