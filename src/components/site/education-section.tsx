import { educationalTimeline } from "@/lib/portfolio-data";
import { MandalaIcon } from "@/components/icons/mandala-icon";

export function EducationSection() {
  return (
    <section id="education" className="bg-secondary/50 dark:bg-secondary/20">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Educational Journey
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            My academic path and the foundations of my expertise.
          </p>
        </div>
        <div className="relative mt-12">
          <div
            className="absolute left-1/2 -ml-[1px] h-full w-0.5 bg-border"
            aria-hidden="true"
          />
          {educationalTimeline.map((item, index) => (
            <div
              key={item.degree}
              className="relative mb-12"
            >
              <div className="flex items-center"
                style={{
                  flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                }}
              >
                <div className="w-1/2 px-4">
                  <div className={`text-center md:text-left ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className="font-headline text-xl font-semibold text-primary">
                      {item.degree}
                    </h3>
                    <p className="font-medium">{item.institution}</p>
                    <p className="text-sm text-muted-foreground">{item.year}</p>
                    <p className="mt-2 text-sm">{item.details}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 -ml-4 h-8 w-8 flex items-center justify-center">
                  <MandalaIcon className="h-full w-full" />
                </div>
                <div className="w-1/2 px-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
