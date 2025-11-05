"use client";

import { useState } from "react";
import Link from "next/link";
import { contactDetails } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as Icons from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function isIconName(name: string): name is keyof typeof Icons {
  return name in Icons;
}

export function ContactSection() {
  return (
    <section id="contact" className="container">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Get in Touch
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          I'm open to new opportunities and collaborations. Feel free to reach out.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
            <CardDescription>
              Send me a message directly. I'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="https://hooks.zapier.com/hooks/catch/25226128/us9l3s6/" method="POST" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Your Email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your Message" required />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <h3 className="font-headline text-2xl font-semibold">Contact Information</h3>
          <div className="space-y-4 text-lg">
             <a href={`mailto:${contactDetails.email}`} className="flex items-center gap-4 group">
              <Icons.Mail className="h-6 w-6 text-primary"/>
              <span className="group-hover:text-primary transition-colors">{contactDetails.email}</span>
            </a>
            <div className="flex items-center gap-4">
              <Icons.Phone className="h-6 w-6 text-primary"/>
              <span>{contactDetails.phone}</span>
            </div>
          </div>
           <div className="flex space-x-4 pt-4">
            {contactDetails.socials.map((social) => {
               const IconComponent = isIconName(social.icon)
                      ? Icons[social.icon]
                      : Icons.Link;
              return(
              <Button key={social.name} asChild variant="outline" size="icon">
                <Link href={social.url} target="_blank">
                  <IconComponent className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              </Button>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}