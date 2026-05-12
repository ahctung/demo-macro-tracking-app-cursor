import { BarChart3, Camera, Goal, Smartphone, Sparkles, Users } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "Scan & Log Instantly",
    description: "Snap a photo or scan a barcode. Our AI recognizes foods and fills in the macros automatically.",
  },
  {
    icon: BarChart3,
    title: "Visual Progress Tracking",
    description: "Beautiful charts and graphs show your daily, weekly, and monthly macro trends at a glance.",
  },
  {
    icon: Goal,
    title: "Personalized Goals",
    description: "Set custom targets for protein, carbs, fats, and calories based on your fitness objectives.",
  },
  {
    icon: Sparkles,
    title: "Smart Suggestions",
    description: "Get meal recommendations that help you hit your remaining macros for the day.",
  },
  {
    icon: Users,
    title: "Community & Challenges",
    description: "Join challenges, share progress, and stay motivated with a supportive fitness community.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Seamless sync across web, iOS, and Android. Your data is always with you.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-card py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything You Need to Hit Your Goals
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed to make macro tracking simple, accurate, and even enjoyable.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
