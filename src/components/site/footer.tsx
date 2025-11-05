import Link from "next/link";
import { Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50 dark:bg-secondary/20">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Omkar Ascent</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Omkar. All rights reserved.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Built with passion and innovation.</p>
        </div>
      </div>
    </footer>
  );
}
