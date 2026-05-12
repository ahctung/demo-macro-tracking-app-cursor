"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Drumstick, Wheat, Droplet } from "lucide-react"

interface DailySummaryProps {
  calories: { current: number; goal: number }
  protein: { current: number; goal: number }
  carbs: { current: number; goal: number }
  fats: { current: number; goal: number }
}

export function DailySummary({ calories, protein, carbs, fats }: DailySummaryProps) {
  const caloriePercentage = Math.min((calories.current / calories.goal) * 100, 100)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Daily Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calories Ring */}
        <div className="flex items-center gap-6">
          <div className="relative flex h-28 w-28 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${caloriePercentage * 2.64} 264`}
                className="text-primary transition-all duration-500"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <Flame className="mb-1 h-5 w-5 text-primary" />
              <span className="text-xl font-bold text-foreground">{calories.current}</span>
              <span className="text-xs text-muted-foreground">kcal</span>
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Calories</span>
              <span className="text-sm text-muted-foreground">
                {calories.goal - calories.current > 0
                  ? `${calories.goal - calories.current} left`
                  : "Goal reached!"}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {calories.current} <span className="text-base font-normal text-muted-foreground">/ {calories.goal}</span>
            </p>
            <Progress value={caloriePercentage} className="h-2" />
          </div>
        </div>

        {/* Macros Grid */}
        <div className="grid grid-cols-3 gap-4">
          <MacroCard
            label="Protein"
            current={protein.current}
            goal={protein.goal}
            icon={Drumstick}
            color="bg-chart-1"
          />
          <MacroCard
            label="Carbs"
            current={carbs.current}
            goal={carbs.goal}
            icon={Wheat}
            color="bg-chart-2"
          />
          <MacroCard
            label="Fats"
            current={fats.current}
            goal={fats.goal}
            icon={Droplet}
            color="bg-chart-4"
          />
        </div>
      </CardContent>
    </Card>
  )
}

function MacroCard({
  label,
  current,
  goal,
  icon: Icon,
  color,
}: {
  label: string
  current: number
  goal: number
  icon: React.ElementType
  color: string
}) {
  const percentage = Math.min((current / goal) * 100, 100)

  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="mb-2 flex items-center gap-2">
        <div className={`rounded-full p-1.5 ${color}/10`}>
          <Icon className={`h-4 w-4`} style={{ color: `var(--${color.replace('bg-', '')})` }} />
        </div>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="mb-2 text-lg font-bold text-foreground">
        {current}g <span className="text-xs font-normal text-muted-foreground">/ {goal}g</span>
      </p>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
