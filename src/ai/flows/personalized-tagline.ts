'use server';

/**
 * @fileOverview Generates a personalized tagline for the hero section based on user interest.
 *
 * - generatePersonalizedTagline - A function that generates the personalized tagline.
 * - PersonalizedTaglineInput - The input type for the generatePersonalizedTagline function.
 * - PersonalizedTaglineOutput - The return type for the generatePersonalizedTagline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTaglineInputSchema = z.object({
  userInterest: z
    .string()
    .describe("The user's perceived interest, e.g., 'data-driven', 'creative'."),
});
export type PersonalizedTaglineInput = z.infer<typeof PersonalizedTaglineInputSchema>;

const PersonalizedTaglineOutputSchema = z.object({
  tagline: z.string().describe('The personalized tagline for the hero section.'),
});
export type PersonalizedTaglineOutput = z.infer<typeof PersonalizedTaglineOutputSchema>;

export async function generatePersonalizedTagline(
  input: PersonalizedTaglineInput
): Promise<PersonalizedTaglineOutput> {
  return personalizedTaglineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTaglinePrompt',
  input: {schema: PersonalizedTaglineInputSchema},
  output: {schema: PersonalizedTaglineOutputSchema},
  prompt: `You are an AI assistant specializing in creating personalized taglines.

  Based on the user's interest, generate a tagline that reflects Omkar's devotion, discipline, and innovation.

  User Interest: {{{userInterest}}}

  Tagline:`, // Removed Handlebars 'safeString' function.
});

const personalizedTaglineFlow = ai.defineFlow(
  {
    name: 'personalizedTaglineFlow',
    inputSchema: PersonalizedTaglineInputSchema,
    outputSchema: PersonalizedTaglineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
