import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-primary" />
            <span>Track smarter, not harder</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Master Your Nutrition with{" "}
            <span className="text-primary">Effortless</span> Macro Tracking
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Log meals in seconds, visualize your progress, and hit your protein, carb, and fat goals. 
            The simplest way to fuel your fitness journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full gap-2 sm:w-auto">
              Start Tracking Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              See How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <p className="mt-8 text-sm text-muted-foreground">
            Join <span className="font-semibold text-foreground">50,000+</span> users tracking their macros daily
          </p>
        </div>

        {/* Hero Visual */}
        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5">
            {/* App Mockup */}
            <div className="bg-muted/30 p-4 md:p-8">
              <div className="grid gap-4 md:grid-cols-3">
                {/* Daily Summary Card */}
                <div className="rounded-xl bg-card p-4 shadow-sm md:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Today&apos;s Progress</h3>
                    <span className="text-sm text-muted-foreground">1,847 / 2,200 cal</span>
                  </div>
                  <div className="mb-6 h-3 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[84%] rounded-full bg-primary" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <MacroBar label="Protein" current={142} goal={180} color="bg-chart-1" />
                    <MacroBar label="Carbs" current={185} goal={250} color="bg-chart-2" />
                    <MacroBar label="Fats" current={58} goal={70} color="bg-chart-4" />
                  </div>
                </div>

                {/* Quick Add Card */}
                <div className="rounded-xl bg-card p-4 shadow-sm">
                  <h3 className="mb-4 font-semibold text-foreground">Quick Add</h3>
                  <div className="space-y-2">
                    <QuickAddItem name="Chicken Breast" calories={165} />
                    <QuickAddItem name="Brown Rice" calories={216} />
                    <QuickAddItem name="Broccoli" calories={55} />
                    <QuickAddItem name="Olive Oil" calories={119} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MacroBar({ label, current, goal, color }: { label: string; current: number; goal: number; color: string }) {
  const percentage = Math.min((current / goal) * 100, 100)
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{current}g</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
      <div className="mt-1 text-right text-xs text-muted-foreground">/ {goal}g</div>
    </div>
  )
}

function QuickAddItem({ name, calories }: { name: string; calories: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 transition-colors hover:bg-muted">
      <span className="text-sm text-foreground">{name}</span>
      <span className="text-xs text-muted-foreground">{calories} cal</span>
    </div>
  )
}
