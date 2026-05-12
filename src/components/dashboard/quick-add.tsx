"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, History } from "lucide-react"

interface QuickAddFood {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  serving: string
}

const recentFoods: QuickAddFood[] = [
  { id: "1", name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, serving: "100g" },
  { id: "2", name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fats: 0.7, serving: "170g" },
  { id: "3", name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fats: 3, serving: "1 cup" },
  { id: "4", name: "Banana", calories: 105, protein: 1.3, carbs: 27, fats: 0.4, serving: "1 medium" },
  { id: "5", name: "Almonds", calories: 164, protein: 6, carbs: 6, fats: 14, serving: "1 oz" },
]

interface QuickAddProps {
  onQuickAdd: (food: QuickAddFood) => void
}

export function QuickAdd({ onQuickAdd }: QuickAddProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-lg">Quick Add</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {recentFoods.map((food) => (
          <div
            key={food.id}
            className="group flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/30"
          >
            <div>
              <p className="font-medium text-foreground">{food.name}</p>
              <p className="text-xs text-muted-foreground">
                {food.serving} · {food.calories} cal
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => onQuickAdd(food)}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Quick add {food.name}</span>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
