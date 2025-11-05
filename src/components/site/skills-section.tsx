import { skills } from "@/lib/portfolio-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as Icons from "lucide-react";

// A type guard to check if a string is a valid Lucide icon name
function isIconName(name: string): name is keyof typeof Icons {
  return name in Icons;
}

export function SkillsSection() {
  return (
    <section id="skills" className="bg-secondary/50 dark:bg-secondary/20">
      <div className="container space-y-12">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Skills & Expertise
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A blend of technical prowess and effective soft skills to drive results.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skillCategory) => (
            <Card key={skillCategory.category} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  {skillCategory.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {skillCategory.technologies.map((tech) => {
                    const IconComponent = isIconName(tech.icon)
                      ? Icons[tech.icon]
                      : Icons.Code;
                    return (
                      <Badge
                        key={tech.name}
                        variant="outline"
                        className="py-2 px-4 text-base bg-background"
                      >
                        <IconComponent className="mr-2 h-4 w-4 text-accent" />
                        {tech.name}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
