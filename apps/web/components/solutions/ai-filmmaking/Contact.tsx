"use client";

import { useEffect, useState } from "react";

interface ContactData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export function Contact() {
  const [data, setData] = useState<ContactData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/ai-film/contact");
        const json = await res.json();
        if (json) setData(json);
      } catch (err) {
        console.error("Failed to fetch contact data:", err);
      }
    })();
  }, []);

  if (!data) return null;

  return (
    <section id="contact" className="relative py-32 bg-card/30">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-black mb-8">{data.title}</h2>
        <p className="text-2xl text-muted-foreground mb-12">{data.subtitle}</p>
        <a
          href={data.buttonLink}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform"
        >
          {data.buttonText}
        </a>
      </div>
    </section>
  );
}
