'use server';

/**
 * @fileOverview Generates a concise resume summary based on the portfolio content.
 *
 * - generateResumeSummary - A function that generates the resume summary.
 * - ResumeSummaryInput - The input type for the generateResumeSummary function.
 * - ResumeSummaryOutput - The return type for the generateResumeSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeSummaryInputSchema = z.object({
  aboutMe: z.string().describe('A detailed description about Omkar.'),
  skills: z.array(z.string()).describe('A list of Omkar skills.'),
  projects: z.array(
    z.object({
      name: z.string().describe('The name of the project.'),
      description: z.string().describe('A brief description of the project.'),
      techStack: z.array(z.string()).describe('The technologies used in the project.'),
    })
  ).describe('A list of Omkar projects.'),
  educationalTimeline: z.array(
    z.object({
      degree: z.string().describe('The degree obtained.'),
      institution: z.string().describe('The institution name.'),
      year: z.string().describe('The year of graduation.'),
    })
  ).describe('A list of Omkar educational achievements.'),
});

export type ResumeSummaryInput = z.infer<typeof ResumeSummaryInputSchema>;

const ResumeSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise resume summary.'),
});

export type ResumeSummaryOutput = z.infer<typeof ResumeSummaryOutputSchema>;

export async function generateResumeSummary(input: ResumeSummaryInput): Promise<ResumeSummaryOutput> {
  return resumeSummaryFlow(input);
}

const resumeSummaryPrompt = ai.definePrompt({
  name: 'resumeSummaryPrompt',
  input: {schema: ResumeSummaryInputSchema},
  output: {schema: ResumeSummaryOutputSchema},
  prompt: `You are a professional resume writer. Based on the information provided, create a concise and compelling resume summary for Omkar.

About Me: {{{aboutMe}}}

Skills:
{{#each skills}}- {{{this}}}
{{/each}}

Projects:
{{#each projects}}
- Name: {{{name}}}
  Description: {{{description}}}
  Tech Stack:
  {{#each techStack}}- {{{this}}}
  {{/each}}
{{/each}}

Education:
{{#each educationalTimeline}}
- Degree: {{{degree}}}
  Institution: {{{institution}}}
  Year: {{{year}}}
{{/each}}`,
});

const resumeSummaryFlow = ai.defineFlow(
  {
    name: 'resumeSummaryFlow',
    inputSchema: ResumeSummaryInputSchema,
    outputSchema: ResumeSummaryOutputSchema,
  },
  async input => {
    const {output} = await resumeSummaryPrompt(input);
    return output!;
  }
);
