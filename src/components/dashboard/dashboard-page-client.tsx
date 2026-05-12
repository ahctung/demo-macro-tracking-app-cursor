'use client'

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

import { AddFoodDialog } from "@/components/dashboard/add-food-dialog"
import { DailySummary } from "@/components/dashboard/daily-summary"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FoodLog, LoggedFood } from "@/components/dashboard/food-log"
import { QuickAdd } from "@/components/dashboard/quick-add"
import { Button } from "@/components/ui/button"

interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  serving: string
}

const userGoals = {
  calories: 2200,
  protein: 180,
  carbs: 250,
  fats: 70,
}

export function DashboardPageClient({ userEmail }: { userEmail: string }) {
  const [loggedFoods, setLoggedFoods] = useState<LoggedFood[]>([
    {
      id: "init-1",
      name: "Scrambled Eggs",
      calories: 147,
      protein: 10,
      carbs: 2,
      fats: 11,
      serving: "2 eggs",
      servings: 1,
      meal: "breakfast",
      time: "8:30 AM",
    },
    {
      id: "init-2",
      name: "Whole Wheat Toast",
      calories: 80,
      protein: 4,
      carbs: 15,
      fats: 1,
      serving: "1 slice",
      servings: 2,
      meal: "breakfast",
      time: "8:30 AM",
    },
    {
      id: "init-3",
      name: "Grilled Chicken Salad",
      calories: 350,
      protein: 35,
      carbs: 12,
      fats: 18,
      serving: "1 bowl",
      servings: 1,
      meal: "lunch",
      time: "12:45 PM",
    },
  ])

  const [currentDate] = useState(new Date())

  const totals = loggedFoods.reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories * food.servings,
      protein: acc.protein + food.protein * food.servings,
      carbs: acc.carbs + food.carbs * food.servings,
      fats: acc.fats + food.fats * food.servings,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 },
  )

  const handleAddFood = (food: FoodItem, servings: number, meal: string) => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })

    const newFood: LoggedFood = {
      ...food,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      servings,
      meal,
      time: timeStr,
    }

    setLoggedFoods((prev) => [...prev, newFood])
  }

  const handleRemoveFood = (id: string) => {
    setLoggedFoods((prev) => prev.filter((food) => food.id !== id))
  }

  const handleQuickAdd = (food: FoodItem) => {
    const hour = new Date().getHours()
    let meal = "snacks"
    if (hour < 11) meal = "breakfast"
    else if (hour < 15) meal = "lunch"
    else if (hour < 20) meal = "dinner"

    handleAddFood(food, 1, meal)
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()

    if (isToday) return "Today"

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userEmail={userEmail} />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous day</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(currentDate)}
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next day</span>
            </Button>
          </div>

          <AddFoodDialog onAddFood={handleAddFood} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <DailySummary
              calories={{ current: Math.round(totals.calories), goal: userGoals.calories }}
              protein={{ current: Math.round(totals.protein), goal: userGoals.protein }}
              carbs={{ current: Math.round(totals.carbs), goal: userGoals.carbs }}
              fats={{ current: Math.round(totals.fats), goal: userGoals.fats }}
            />

            <FoodLog foods={loggedFoods} onRemoveFood={handleRemoveFood} />
          </div>

          <div className="space-y-6">
            <QuickAdd onQuickAdd={handleQuickAdd} />
          </div>
        </div>
      </main>
    </div>
  )
}
