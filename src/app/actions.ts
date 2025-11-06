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

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(1, "Message is required."),
});

export async function submitContactForm(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
    const data = Object.fromEntries(formData.entries());
    const parsed = contactFormSchema.safeParse(data);

    if (!parsed.success) {
      // Create a single error message string from Zod errors.
      const errorMessage = parsed.error.issues.map((issue) => issue.message).join(", ");
      return { success: false, message: errorMessage };
    }

    const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/25226128/us9l3s6/";

    try {
      const response = await fetch(zapierWebhookUrl, {
        method: "POST",
        body: JSON.stringify(parsed.data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return { success: true, message: "Message sent successfully!" };
      } else {
        const errorBody = await response.text();
        console.error("Zapier webhook error:", response.status, errorBody);
        return { success: false, message: `An error occurred while sending your message. Please try again later.` };
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}
