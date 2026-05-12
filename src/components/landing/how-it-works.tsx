export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Set Your Goals",
      description: "Tell us your fitness goals and we&apos;ll calculate your ideal daily macros for protein, carbs, and fats.",
    },
    {
      step: "02",
      title: "Log Your Meals",
      description: "Add foods quickly with our barcode scanner, AI photo recognition, or search from 2M+ foods database.",
    },
    {
      step: "03",
      title: "Track Your Progress",
      description: "Watch your daily intake update in real-time and see your progress toward your goals with visual charts.",
    },
    {
      step: "04",
      title: "Reach Your Goals",
      description: "Stay consistent with reminders, insights, and community support. Celebrate your wins along the way.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get started in minutes. No complicated setup, no learning curve.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((item, index) => (
              <div
                key={index}
                className="relative rounded-2xl border border-border bg-card p-6 md:p-8"
              >
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-4xl font-bold text-primary/20">{item.step}</span>
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
