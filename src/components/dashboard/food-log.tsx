"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit2, Sun, Cloud, Moon, Cookie } from "lucide-react"

export interface LoggedFood {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  serving: string
  servings: number
  meal: string
  time: string
}

interface FoodLogProps {
  foods: LoggedFood[]
  onRemoveFood: (id: string) => void
}

const mealConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  breakfast: { icon: Sun, label: "Breakfast", color: "bg-chart-4/10 text-chart-4" },
  lunch: { icon: Cloud, label: "Lunch", color: "bg-chart-1/10 text-chart-1" },
  dinner: { icon: Moon, label: "Dinner", color: "bg-chart-3/10 text-chart-3" },
  snacks: { icon: Cookie, label: "Snacks", color: "bg-chart-2/10 text-chart-2" },
}

export function FoodLog({ foods, onRemoveFood }: FoodLogProps) {
  const groupedFoods = foods.reduce(
    (acc, food) => {
      if (!acc[food.meal]) acc[food.meal] = []
      acc[food.meal].push(food)
      return acc
    },
    {} as Record<string, LoggedFood[]>
  )

  const mealOrder = ["breakfast", "lunch", "dinner", "snacks"]
  const sortedMeals = mealOrder.filter((meal) => groupedFoods[meal]?.length > 0)

  if (foods.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{"Today's Food Log"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Cookie className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-1 font-semibold text-foreground">No foods logged yet</h3>
            <p className="text-sm text-muted-foreground">
              Start tracking by adding your first meal of the day
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{"Today's Food Log"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {sortedMeals.map((meal) => {
          const config = mealConfig[meal]
          const Icon = config.icon
          const mealFoods = groupedFoods[meal]
          const mealCalories = mealFoods.reduce(
            (sum, f) => sum + f.calories * f.servings,
            0
          )

          return (
            <div key={meal}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1.5 ${config.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-foreground">{config.label}</span>
                </div>
                <span className="text-sm text-muted-foreground">{mealCalories} cal</span>
              </div>

              <div className="space-y-2">
                {mealFoods.map((food) => (
                  <div
                    key={food.id}
                    className="group flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{food.name}</span>
                        {food.servings !== 1 && (
                          <Badge variant="secondary" className="text-xs">
                            x{food.servings}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {food.serving} · {food.time}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-foreground">
                          {Math.round(food.calories * food.servings)} cal
                        </p>
                        <p className="text-xs text-muted-foreground">
                          P: {Math.round(food.protein * food.servings)}g ·{" "}
                          C: {Math.round(food.carbs * food.servings)}g ·{" "}
                          F: {Math.round(food.fats * food.servings)}g
                        </p>
                      </div>

                      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit food</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => onRemoveFood(food.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove food</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
