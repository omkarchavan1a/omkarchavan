import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/portfolio-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projects" className="container">
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Project Portfolio
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A selection of projects that demonstrate my passion for data and system design.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => {
            const projectImage = PlaceHolderImages.find(
              (img) => img.id === project.imagePlaceholderId
            );
            return (
              <Card key={project.name} className="flex flex-col overflow-hidden">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  {projectImage && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <Image
                        src={projectImage.imageUrl}
                        alt={projectImage.description}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        data-ai-hint={projectImage.imageHint}
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center gap-4">
                  {project.githubLink && (
                    <Button asChild variant="outline">
                      <Link href={project.githubLink} target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                      </Link>
                    </Button>
                  )}
                  {project.liveLink && (
                     <Button asChild>
                      <Link href={project.liveLink} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Website
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
