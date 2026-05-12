"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Barcode, Sparkles } from "lucide-react"

interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  serving: string
}

const popularFoods: FoodItem[] = [
  { id: "1", name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, serving: "100g" },
  { id: "2", name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fats: 1.8, serving: "1 cup" },
  { id: "3", name: "Broccoli", calories: 55, protein: 3.7, carbs: 11, fats: 0.6, serving: "1 cup" },
  { id: "4", name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fats: 11, serving: "2 large" },
  { id: "5", name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fats: 0.7, serving: "170g" },
  { id: "6", name: "Salmon", calories: 208, protein: 20, carbs: 0, fats: 13, serving: "100g" },
]

interface AddFoodDialogProps {
  onAddFood: (food: FoodItem, servings: number, meal: string) => void
}

export function AddFoodDialog({ onAddFood }: AddFoodDialogProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [servings, setServings] = useState("1")
  const [meal, setMeal] = useState("breakfast")
  const [manualEntry, setManualEntry] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    serving: "100g",
  })

  const filteredFoods = popularFoods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddFood = () => {
    if (selectedFood) {
      onAddFood(selectedFood, parseFloat(servings), meal)
      setOpen(false)
      setSelectedFood(null)
      setServings("1")
      setSearchQuery("")
    }
  }

  const handleAddManualFood = () => {
    const food: FoodItem = {
      id: Date.now().toString(),
      name: manualEntry.name,
      calories: parseFloat(manualEntry.calories) || 0,
      protein: parseFloat(manualEntry.protein) || 0,
      carbs: parseFloat(manualEntry.carbs) || 0,
      fats: parseFloat(manualEntry.fats) || 0,
      serving: manualEntry.serving,
    }
    onAddFood(food, 1, meal)
    setOpen(false)
    setManualEntry({ name: "", calories: "", protein: "", carbs: "", fats: "", serving: "100g" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Food
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Food</DialogTitle>
          <DialogDescription>
            Search for a food, scan a barcode, or enter nutrition info manually.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search" className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="scan" className="gap-2">
              <Barcode className="h-4 w-4" />
              Scan
            </TabsTrigger>
            <TabsTrigger value="manual" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="mt-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search foods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="max-h-48 space-y-1 overflow-y-auto">
              {filteredFoods.map((food) => (
                <button
                  key={food.id}
                  onClick={() => setSelectedFood(food)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors ${
                    selectedFood?.id === food.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <div>
                    <p className="font-medium text-foreground">{food.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {food.serving} · {food.calories} cal
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>P: {food.protein}g</p>
                    <p>C: {food.carbs}g · F: {food.fats}g</p>
                  </div>
                </button>
              ))}
            </div>

            {selectedFood && (
              <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="servings">Servings</Label>
                    <Input
                      id="servings"
                      type="number"
                      min="0.25"
                      step="0.25"
                      value={servings}
                      onChange={(e) => setServings(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="meal">Meal</Label>
                    <Select value={meal} onValueChange={setMeal}>
                      <SelectTrigger id="meal">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snacks">Snacks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-medium text-foreground">
                    {Math.round(selectedFood.calories * parseFloat(servings || "0"))} cal ·{" "}
                    P: {Math.round(selectedFood.protein * parseFloat(servings || "0"))}g ·{" "}
                    C: {Math.round(selectedFood.carbs * parseFloat(servings || "0"))}g ·{" "}
                    F: {Math.round(selectedFood.fats * parseFloat(servings || "0"))}g
                  </span>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFood} disabled={!selectedFood}>
                Add Food
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="scan" className="mt-4 space-y-4">
            <div className="flex h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30">
              <Barcode className="mb-2 h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Barcode scanning coming soon</p>
              <p className="text-xs text-muted-foreground">Use the search or manual entry for now</p>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="food-name">Food Name</Label>
                <Input
                  id="food-name"
                  placeholder="e.g., Homemade Pasta"
                  value={manualEntry.name}
                  onChange={(e) => setManualEntry({ ...manualEntry, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    placeholder="0"
                    value={manualEntry.calories}
                    onChange={(e) => setManualEntry({ ...manualEntry, calories: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="serving-size">Serving Size</Label>
                  <Input
                    id="serving-size"
                    placeholder="100g"
                    value={manualEntry.serving}
                    onChange={(e) => setManualEntry({ ...manualEntry, serving: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    placeholder="0"
                    value={manualEntry.protein}
                    onChange={(e) => setManualEntry({ ...manualEntry, protein: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    placeholder="0"
                    value={manualEntry.carbs}
                    onChange={(e) => setManualEntry({ ...manualEntry, carbs: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="fats">Fats (g)</Label>
                  <Input
                    id="fats"
                    type="number"
                    placeholder="0"
                    value={manualEntry.fats}
                    onChange={(e) => setManualEntry({ ...manualEntry, fats: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="manual-meal">Meal</Label>
                <Select value={meal} onValueChange={setMeal}>
                  <SelectTrigger id="manual-meal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snacks">Snacks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddManualFood} disabled={!manualEntry.name}>
                Add Food
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
