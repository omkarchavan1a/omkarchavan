import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omkar Chavan: Data Analyst & Automation Specialist",
  description: "Portfolio for Omkar Chavan, a Data Analyst and Automation Specialist showcasing projects in SQL, Power BI, and Python.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Omkar Chavan",
          "url": "https://omkarchavan.vercel.app/",
          "sameAs": [
            "https://github.com/omkarchavan1a",
            "https://www.linkedin.com/in/omkar-chavan-1402ba2a3"
          ],
          "jobTitle": "Data Analyst",
          "knowsAbout": ["Data Analysis", "Automation", "SQL", "Power BI", "Tableau", "n8n", "Python"]
        }) }} />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
