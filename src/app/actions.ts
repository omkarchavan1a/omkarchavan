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
