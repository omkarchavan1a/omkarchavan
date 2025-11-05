"use server";

import { generatePersonalizedTagline } from "@/ai/flows/personalized-tagline";
import { generateResumeSummary, type ResumeSummaryInput } from "@/ai/flows/resume-summary";
import * as data from "@/lib/portfolio-data";
import { z } from "zod";

export async function getPersonalizedTagline(
  userInterest: string
): Promise<{ tagline: string } | { error: string }> {
  try {
    const result = await generatePersonalizedTagline({ userInterest });
    return result;
  } catch (error) {
    console.error("Error generating tagline:", error);
    return { error: "Failed to generate a personalized tagline. Please try again." };
  }
}

export async function getResumeSummary(): Promise<{ summary: string } | { error: string }> {
  try {
    const summaryInput: ResumeSummaryInput = {
      aboutMe: data.aboutMe.introduction,
      skills: data.skills.flatMap(s => s.technologies.map(t => t.name)),
      projects: data.projects.map(p => ({
        name: p.name,
        description: p.description,
        techStack: p.techStack,
      })),
      educationalTimeline: data.educationalTimeline.map(e => ({
        degree: e.degree,
        institution: e.institution,
        year: e.year,
      })),
    };

    const result = await generateResumeSummary(summaryInput);
    return result;
  } catch (error) {
    console.error("Error generating resume summary:", error);
    return { error: "Failed to generate resume summary. Please try again." };
  }
}

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors in the form.",
    };
  }

  // In a real application, you would send this data to your backend or a service like Resend/SendGrid.
  console.log("Contact form submitted:", validatedFields.data);

  return {
    message: "Thank you for your message! I will get back to you soon.",
    errors: {},
  };
}
