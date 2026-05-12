import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center md:px-12 md:py-24">
          {/* Background Pattern */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
          </div>

          <h2 className="mx-auto mb-6 max-w-2xl text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
            Start Your Nutrition Journey Today
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-pretty text-lg text-primary-foreground/80">
            Join thousands of users who have transformed their health with MacroTrack. 
            It&apos;s free to start, no credit card required.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="w-full gap-2 sm:w-auto">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="w-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
