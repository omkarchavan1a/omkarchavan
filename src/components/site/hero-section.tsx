"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { getPersonalizedTagline } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const interestOptions = ["Data-driven", "Creative", "Innovative"];

export function HeroSection() {
  const [isPending, startTransition] = useTransition();
  const [tagline, setTagline] = useState(
    "A portfolio of devotion, discipline, and innovation."
  );
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const { toast } = useToast();

  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");

  const handleGenerateTagline = (interest: string) => {
    setSelectedInterest(interest);
    startTransition(async () => {
      const result = await getPersonalizedTagline(interest);
      if ("tagline" in result) {
        setTagline(result.tagline);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
      }
    });
  };

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt="Abstract background for Omkar Chavan's data analyst portfolio"
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/60 dark:bg-background/80" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <div className="container">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Omkar Chavan: Data Analyst &amp; Automation Specialist
          </h1>
          <div className="mt-6 min-h-[2.25rem] md:min-h-[2.5rem]">
            {isPending ? (
              <Skeleton className="mx-auto h-8 w-3/4 max-w-2xl" />
            ) : (
              <p className="max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
                {tagline}
              </p>
            )}
          </div>
          <div className="mt-8">
            <p className="mb-4 text-sm font-medium text-foreground">
              See this portfolio through a different lens:
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {interestOptions.map((interest) => (
                <Button
                  key={interest}
                  variant={selectedInterest === interest ? "default" : "secondary"}
                  onClick={() => handleGenerateTagline(interest)}
                  disabled={isPending}
                >
                  {interest} Perspective
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
