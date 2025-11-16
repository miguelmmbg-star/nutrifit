"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Camera, Droplet, Dumbbell, Crown, Upload, X, Sparkles, Moon, Sun, Menu, LogOut, User as UserIcon, Zap, Star, TrendingUp, Apple, Salad, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/contexts/ThemeContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type NutritionData = {
  food: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  confidence: number
}

type WorkoutPlan = {
  exercise: string
  sets: number
  reps: string
  rest: number
  tips: string
}

type User = {
  email: string
  name: string
}

type Meal = {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

type DietPlan = {
  name: string
  description: string
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  meals: {
    breakfast: Meal
    lunch: Meal
    snack: Meal
    dinner: Meal
  }
}

export default function Home() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [user, setUser] = useState<User | null>(null)
  const [isVip, setIsVip] = useState(false)
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("moderate")
  const [waterIntake, setWaterIntake] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [goal, setGoal] = useState("")
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan[] | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedDietGoal, setSelectedDietGoal] = useState("")
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  const calculateWater = () => {
    if (!weight) return
    const weightNum = parseFloat(weight)
    let baseWater = weightNum * 0.035 // 35ml por kg

    // Ajuste por nível de atividade
    if (activityLevel === "light") baseWater *= 1.1
    if (activityLevel === "moderate") baseWater *= 1.3
    if (activityLevel === "intense") baseWater *= 1.5

    setWaterIntake(Math.round(baseWater * 10) / 10)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeFood = async () => {
    if (!selectedImage) return
    
    setIsAnalyzing(true)
    // Simulação de análise com IA
    setTimeout(() => {
      const foods = [
        { food: "Frango Grelhado com Arroz e Brócolis", calories: 450, protein: 42, carbs: 48, fat: 8, fiber: 6 },
        { food: "Salada Caesar com Croutons", calories: 320, protein: 18, carbs: 22, fat: 18, fiber: 4 },
        { food: "Pizza Margherita (2 fatias)", calories: 580, protein: 24, carbs: 68, fat: 22, fiber: 3 },
        { food: "Smoothie de Frutas", calories: 280, protein: 6, carbs: 58, fat: 2, fiber: 8 },
        { food: "Hambúrguer com Batata Frita", calories: 850, protein: 32, carbs: 78, fat: 42, fiber: 5 }
      ]
      const randomFood = foods[Math.floor(Math.random() * foods.length)]
      setNutritionData({ ...randomFood, confidence: 85 + Math.floor(Math.random() * 15) })
      setIsAnalyzing(false)
    }, 2000)
  }

  const generateWorkout = () => {
    if (!goal) return
    
    setIsGenerating(true)
    setTimeout(() => {
      const workouts: Record<string, WorkoutPlan[]> = {
        "perder peso": [
          { exercise: "Burpees", sets: 4, reps: "15-20", rest: 45, tips: "Mantenha o core contraído" },
          { exercise: "Mountain Climbers", sets: 4, reps: "30 seg", rest: 30, tips: "Ritmo acelerado" },
          { exercise: "Jump Squats", sets: 3, reps: "15", rest: 60, tips: "Aterrisse suavemente" },
          { exercise: "High Knees", sets: 4, reps: "45 seg", rest: 30, tips: "Joelhos na altura do quadril" },
          { exercise: "Prancha", sets: 3, reps: "60 seg", rest: 45, tips: "Corpo alinhado" }
        ],
        "ganhar massa": [
          { exercise: "Supino Reto", sets: 4, reps: "8-12", rest: 90, tips: "Desça até o peito" },
          { exercise: "Agachamento Livre", sets: 4, reps: "8-10", rest: 120, tips: "Desça até paralelo" },
          { exercise: "Levantamento Terra", sets: 3, reps: "6-8", rest: 120, tips: "Costas retas" },
          { exercise: "Desenvolvimento", sets: 4, reps: "10-12", rest: 90, tips: "Controle o movimento" },
          { exercise: "Remada Curvada", sets: 4, reps: "10-12", rest: 90, tips: "Puxe até o abdômen" }
        ],
        "definir": [
          { exercise: "Flexão de Braço", sets: 4, reps: "15-20", rest: 60, tips: "Corpo reto" },
          { exercise: "Agachamento Sumô", sets: 4, reps: "15", rest: 60, tips: "Pés afastados" },
          { exercise: "Abdominal Bicicleta", sets: 3, reps: "20", rest: 45, tips: "Toque cotovelo no joelho" },
          { exercise: "Afundo Alternado", sets: 3, reps: "12 cada", rest: 60, tips: "Joelho a 90°" },
          { exercise: "Prancha Lateral", sets: 3, reps: "45 seg cada", rest: 45, tips: "Quadril elevado" }
        ]
      }
      
      const goalKey = Object.keys(workouts).find(key => 
        goal.toLowerCase().includes(key)
      ) || "definir"
      
      setWorkoutPlan(workouts[goalKey])
      setIsGenerating(false)
    }, 1500)
  }

  const generateDietPlan = () => {
    if (!selectedDietGoal) return

    const dietPlans: Record<string, DietPlan> = {
      "perder peso": {
        name: "Dieta para Emagrecimento",
        description: "Plano hipocalórico balanceado para perda de peso saudável",
        totalCalories: 1600,
        totalProtein: 120,
        totalCarbs: 150,
        totalFat: 50,
        meals: {
          breakfast: {
            name: "Café da Manhã",
            calories: 350,
            protein: 25,
            carbs: 40,
            fat: 10
          },
          lunch: {
            name: "Almoço",
            calories: 500,
            protein: 40,
            carbs: 50,
            fat: 15
          },
          snack: {
            name: "Lanche",
            calories: 200,
            protein: 15,
            carbs: 20,
            fat: 8
          },
          dinner: {
            name: "Jantar",
            calories: 450,
            protein: 35,
            carbs: 35,
            fat: 15
          }
        }
      },
      "ganhar massa": {
        name: "Dieta para Ganho de Massa Muscular",
        description: "Plano hipercalórico rico em proteínas para hipertrofia",
        totalCalories: 2800,
        totalProtein: 200,
        totalCarbs: 320,
        totalFat: 80,
        meals: {
          breakfast: {
            name: "Café da Manhã",
            calories: 650,
            protein: 45,
            carbs: 75,
            fat: 18
          },
          lunch: {
            name: "Almoço",
            calories: 850,
            protein: 60,
            carbs: 95,
            fat: 25
          },
          snack: {
            name: "Lanche Pré-Treino",
            calories: 450,
            protein: 35,
            carbs: 55,
            fat: 12
          },
          dinner: {
            name: "Jantar",
            calories: 750,
            protein: 55,
            carbs: 80,
            fat: 22
          }
        }
      },
      "definir": {
        name: "Dieta para Definição Muscular",
        description: "Plano balanceado para manter massa magra e reduzir gordura",
        totalCalories: 2000,
        totalProtein: 160,
        totalCarbs: 180,
        totalFat: 60,
        meals: {
          breakfast: {
            name: "Café da Manhã",
            calories: 450,
            protein: 35,
            carbs: 45,
            fat: 14
          },
          lunch: {
            name: "Almoço",
            calories: 600,
            protein: 50,
            carbs: 60,
            fat: 18
          },
          snack: {
            name: "Lanche",
            calories: 300,
            protein: 25,
            carbs: 30,
            fat: 10
          },
          dinner: {
            name: "Jantar",
            calories: 550,
            protein: 45,
            carbs: 40,
            fat: 16
          }
        }
      },
      "manter peso": {
        name: "Dieta para Manutenção",
        description: "Plano equilibrado para manter peso e saúde",
        totalCalories: 2200,
        totalProtein: 140,
        totalCarbs: 240,
        totalFat: 70,
        meals: {
          breakfast: {
            name: "Café da Manhã",
            calories: 500,
            protein: 30,
            carbs: 60,
            fat: 16
          },
          lunch: {
            name: "Almoço",
            calories: 700,
            protein: 45,
            carbs: 80,
            fat: 22
          },
          snack: {
            name: "Lanche",
            calories: 350,
            protein: 20,
            carbs: 40,
            fat: 12
          },
          dinner: {
            name: "Jantar",
            calories: 550,
            protein: 40,
            carbs: 55,
            fat: 18
          }
        }
      }
    }

    const goalKey = Object.keys(dietPlans).find(key => 
      selectedDietGoal.toLowerCase().includes(key)
    ) || "manter peso"

    setDietPlan(dietPlans[goalKey])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header Melhorado */}
      <header className="border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent hidden sm:block">
                NutriFit AI
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>

              <Button
                onClick={() => setIsVip(!isVip)}
                size="lg"
                className={isVip 
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/50" 
                  : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/50 animate-pulse"
                }
              >
                <Crown className="w-5 h-5 mr-2" />
                {isVip ? "VIP Ativo" : "Ativar VIP"}
                {!isVip && <Sparkles className="w-4 h-4 ml-2" />}
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <UserIcon className="w-4 h-4" />
                      {user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <UserIcon className="w-4 h-4 mr-2" />
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Crown className="w-4 h-4 mr-2" />
                      Planos VIP
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => router.push("/login")} variant="outline">
                  Entrar
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="dark:bg-gray-800">
                  <SheetHeader>
                    <SheetTitle className="dark:text-white">Menu</SheetTitle>
                    <SheetDescription className="dark:text-gray-400">
                      Navegue pelo app
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {user ? (
                      <>
                        <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <UserIcon className="w-5 h-5" />
                          <span className="font-medium dark:text-white">{user.name}</span>
                        </div>
                        <Button
                          onClick={() => setIsVip(!isVip)}
                          size="lg"
                          className={`w-full ${isVip 
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg" 
                            : "bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg animate-pulse"
                          }`}
                        >
                          <Crown className="w-5 h-5 mr-2" />
                          {isVip ? "VIP Ativo" : "Ativar VIP"}
                          {!isVip && <Sparkles className="w-4 h-4 ml-2" />}
                        </Button>
                        <Separator className="dark:bg-gray-700" />
                        <Button variant="outline" className="w-full dark:bg-gray-700 dark:text-white">
                          <UserIcon className="w-4 h-4 mr-2" />
                          Meu Perfil
                        </Button>
                        <Button variant="outline" className="w-full dark:bg-gray-700 dark:text-white">
                          <Crown className="w-4 h-4 mr-2" />
                          Planos VIP
                        </Button>
                        <Button onClick={handleLogout} variant="destructive" className="w-full">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sair
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => router.push("/login")} className="w-full">
                          Entrar
                        </Button>
                        <Button onClick={() => router.push("/cadastro")} variant="outline" className="w-full dark:bg-gray-700 dark:text-white">
                          Criar Conta
                        </Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Banner VIP Promocional - Destaque Principal */}
      {!isVip && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 animate-gradient-x">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Crown className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    Desbloqueie o Plano VIP - R$ 18,00/mês
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </h2>
                  <p className="text-sm md:text-base text-white/90">
                    Treinos personalizados + Análises ilimitadas + Suporte prioritário
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setIsVip(true)}
                size="lg"
                className="bg-white text-amber-600 hover:bg-gray-100 font-bold shadow-xl hover:scale-105 transition-transform whitespace-nowrap"
              >
                <Zap className="w-5 h-5 mr-2" />
                Ativar Agora
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="nutrition" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 dark:bg-gray-800">
            <TabsTrigger value="nutrition" className="flex items-center gap-2 dark:data-[state=active]:bg-gray-700">
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Análise de Alimentos</span>
              <span className="sm:hidden">Alimentos</span>
            </TabsTrigger>
            <TabsTrigger value="water" className="flex items-center gap-2 dark:data-[state=active]:bg-gray-700">
              <Droplet className="w-4 h-4" />
              <span className="hidden sm:inline">Calculadora de Água</span>
              <span className="sm:hidden">Água</span>
            </TabsTrigger>
            <TabsTrigger value="diet" className="flex items-center gap-2 dark:data-[state=active]:bg-gray-700">
              <Apple className="w-4 h-4" />
              <span className="hidden sm:inline">Dietas</span>
              <span className="sm:hidden">Dietas</span>
            </TabsTrigger>
            <TabsTrigger value="workout" className="flex items-center gap-2 dark:data-[state=active]:bg-gray-700" disabled={!isVip}>
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Treinos VIP</span>
              <span className="sm:hidden">Treinos</span>
              {!isVip && <Crown className="w-3 h-3 ml-1 text-amber-500" />}
            </TabsTrigger>
          </TabsList>

          {/* Análise de Alimentos */}
          <TabsContent value="nutrition">
            <Card className="border-2 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Camera className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Análise Nutricional por Foto
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Tire uma foto do seu prato e descubra os nutrientes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  {!selectedImage ? (
                    <label className="w-full max-w-md h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-all">
                      <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Clique para fazer upload</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">ou arraste uma imagem</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative w-full max-w-md">
                      <img
                        src={selectedImage}
                        alt="Food"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setSelectedImage(null)
                          setNutritionData(null)
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {selectedImage && !nutritionData && (
                    <Button
                      onClick={analyzeFood}
                      disabled={isAnalyzing}
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                    >
                      {isAnalyzing ? "Analisando..." : "Analisar Alimento"}
                    </Button>
                  )}
                </div>

                {nutritionData && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold dark:text-white">{nutritionData.food}</h3>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                        {nutritionData.confidence}% confiança
                      </Badge>
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 dark:border-orange-800">
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold text-orange-700 dark:text-orange-400">{nutritionData.calories}</div>
                          <div className="text-sm text-orange-600 dark:text-orange-500">Calorias</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 dark:border-blue-800">
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">{nutritionData.protein}g</div>
                          <div className="text-sm text-blue-600 dark:text-blue-500">Proteína</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 dark:border-amber-800">
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold text-amber-700 dark:text-amber-400">{nutritionData.carbs}g</div>
                          <div className="text-sm text-amber-600 dark:text-amber-500">Carboidratos</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 dark:border-purple-800">
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold text-purple-700 dark:text-purple-400">{nutritionData.fat}g</div>
                          <div className="text-sm text-purple-600 dark:text-purple-500">Gorduras</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-800/20 dark:border-green-800">
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold text-green-700 dark:text-green-400">{nutritionData.fiber}g</div>
                          <div className="text-sm text-green-600 dark:text-green-500">Fibras</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* CTA VIP após análise */}
                    {!isVip && (
                      <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-700">
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Star className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-1">
                                  Quer análises ilimitadas?
                                </h4>
                                <p className="text-sm text-amber-800 dark:text-amber-400">
                                  Com o VIP você tem análises sem limite + histórico completo + recomendações personalizadas
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() => setIsVip(true)}
                              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 whitespace-nowrap"
                            >
                              <Crown className="w-4 h-4 mr-2" />
                              Ativar VIP
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calculadora de Água */}
          <TabsContent value="water">
            <Card className="border-2 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Droplet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Calculadora de Hidratação
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Descubra quanto de água você precisa beber por dia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="dark:text-gray-200">Seu peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Ex: 70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity" className="dark:text-gray-200">Nível de Atividade</Label>
                    <select
                      id="activity"
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="light">Leve (pouco exercício)</option>
                      <option value="moderate">Moderado (3-4x semana)</option>
                      <option value="intense">Intenso (5-7x semana)</option>
                    </select>
                  </div>
                </div>

                <Button
                  onClick={calculateWater}
                  disabled={!weight}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  Calcular Hidratação
                </Button>

                {waterIntake !== null && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <Separator className="dark:bg-gray-700" />
                    
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Droplet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        <div className="text-center">
                          <div className="text-4xl font-bold text-blue-700 dark:text-blue-400">{waterIntake}L</div>
                          <div className="text-sm text-blue-600 dark:text-blue-500">por dia</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <p className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Equivale a aproximadamente {Math.round(waterIntake * 4)} copos de 250ml
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Beba água ao longo do dia, não tudo de uma vez
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Aumente a ingestão em dias quentes ou treinos intensos
                        </p>
                      </div>
                    </div>

                    {/* CTA VIP após cálculo */}
                    {!isVip && (
                      <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-700">
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <TrendingUp className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-1">
                                  Acompanhe sua hidratação diária
                                </h4>
                                <p className="text-sm text-amber-800 dark:text-amber-400">
                                  VIP: Lembretes inteligentes + Gráficos de progresso + Metas personalizadas
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() => setIsVip(true)}
                              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 whitespace-nowrap"
                            >
                              <Crown className="w-4 h-4 mr-2" />
                              Ativar VIP
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dietas Pré-Feitas */}
          <TabsContent value="diet">
            <Card className="border-2 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Salad className="w-5 h-5 text-green-600 dark:text-green-400" />
                  Dietas Pré-Feitas
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Escolha uma dieta de acordo com seu objetivo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="diet-goal" className="dark:text-gray-200">Selecione seu objetivo</Label>
                  <select
                    id="diet-goal"
                    value={selectedDietGoal}
                    onChange={(e) => setSelectedDietGoal(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Escolha um objetivo...</option>
                    <option value="perder peso">Perder Peso</option>
                    <option value="ganhar massa">Ganhar Massa Muscular</option>
                    <option value="definir">Definição Muscular</option>
                    <option value="manter peso">Manter Peso Saudável</option>
                  </select>
                </div>

                <Button
                  onClick={generateDietPlan}
                  disabled={!selectedDietGoal}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  Ver Plano de Dieta
                </Button>

                {dietPlan && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <Separator className="dark:bg-gray-700" />
                    
                    {/* Cabeçalho da Dieta */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800">
                      <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">
                        {dietPlan.name}
                      </h3>
                      <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                        {dietPlan.description}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {dietPlan.totalCalories}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Calorias/dia</div>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {dietPlan.totalProtein}g
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Proteínas</div>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {dietPlan.totalCarbs}g
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Carboidratos</div>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {dietPlan.totalFat}g
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Gorduras</div>
                        </div>
                      </div>
                    </div>

                    {/* Refeições */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg dark:text-white flex items-center gap-2">
                        <UtensilsCrossed className="w-5 h-5 text-green-600 dark:text-green-400" />
                        Distribuição das Refeições
                      </h4>

                      {Object.entries(dietPlan.meals).map(([key, meal], index) => (
                        <Card key={key} className="border-green-200 dark:border-green-800 dark:bg-gray-700 hover:shadow-md transition-shadow">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h5 className="font-semibold text-lg dark:text-white">{meal.name}</h5>
                              </div>
                              <Badge className="bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700">
                                Refeição {index + 1}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-3 text-center">
                              <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg">
                                <div className="text-xl font-bold text-orange-700 dark:text-orange-400">
                                  {meal.calories}
                                </div>
                                <div className="text-xs text-orange-600 dark:text-orange-500">kcal</div>
                              </div>
                              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                                <div className="text-xl font-bold text-blue-700 dark:text-blue-400">
                                  {meal.protein}g
                                </div>
                                <div className="text-xs text-blue-600 dark:text-blue-500">Prot</div>
                              </div>
                              <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                                <div className="text-xl font-bold text-amber-700 dark:text-amber-400">
                                  {meal.carbs}g
                                </div>
                                <div className="text-xs text-amber-600 dark:text-amber-500">Carb</div>
                              </div>
                              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
                                <div className="text-xl font-bold text-purple-700 dark:text-purple-400">
                                  {meal.fat}g
                                </div>
                                <div className="text-xs text-purple-600 dark:text-purple-500">Gord</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-800 dark:text-green-300">
                        <strong>Importante:</strong> Esta é uma dieta base. Para melhores resultados, consulte um nutricionista para personalizar de acordo com suas necessidades específicas.
                      </p>
                    </div>

                    {/* CTA VIP após dieta */}
                    {!isVip && (
                      <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-700">
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Star className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-1">
                                  Quer dietas personalizadas?
                                </h4>
                                <p className="text-sm text-amber-800 dark:text-amber-400">
                                  VIP: Dietas customizadas + Lista de compras + Receitas detalhadas + Substituições inteligentes
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() => setIsVip(true)}
                              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 whitespace-nowrap"
                            >
                              <Crown className="w-4 h-4 mr-2" />
                              Ativar VIP
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Treinos VIP */}
          <TabsContent value="workout">
            <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 dark:bg-gray-800 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  Plano de Treino Personalizado
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Treinos customizados de acordo com seu objetivo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="goal" className="dark:text-gray-200">Qual é o seu objetivo?</Label>
                  <Input
                    id="goal"
                    placeholder="Ex: perder peso, ganhar massa, definir..."
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <Button
                  onClick={generateWorkout}
                  disabled={!goal || isGenerating}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {isGenerating ? "Gerando Treino..." : "Gerar Plano de Treino"}
                </Button>

                {workoutPlan && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <Separator className="dark:bg-gray-700" />
                    
                    <h3 className="text-lg font-semibold flex items-center gap-2 dark:text-white">
                      <Dumbbell className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      Seu Treino Personalizado
                    </h3>

                    <div className="space-y-3">
                      {workoutPlan.map((exercise, index) => (
                        <Card key={index} className="border-amber-200 dark:border-amber-800 dark:bg-gray-700 hover:shadow-md transition-shadow">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-lg dark:text-white">{exercise.exercise}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{exercise.tips}</p>
                              </div>
                              <Badge className="bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-700">
                                #{index + 1}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{exercise.sets}</div>
                                <div className="text-xs text-blue-600 dark:text-blue-500">Séries</div>
                              </div>
                              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{exercise.reps}</div>
                                <div className="text-xs text-emerald-600 dark:text-emerald-500">Repetições</div>
                              </div>
                              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                                <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{exercise.rest}s</div>
                                <div className="text-xs text-purple-600 dark:text-purple-500">Descanso</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        <strong>Dica:</strong> Faça aquecimento de 5-10 minutos antes de começar e alongamento ao final do treino.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Card VIP Fixo na Lateral (Desktop) */}
        {!isVip && (
          <div className="fixed bottom-8 right-8 hidden lg:block z-40 animate-in slide-in-from-right">
            <Card className="w-80 border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 shadow-2xl">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-amber-900 dark:text-amber-300">Plano VIP</h3>
                    <p className="text-xs text-amber-700 dark:text-amber-400">R$ 18,00/mês</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-4 text-sm text-amber-900 dark:text-amber-300">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-600" />
                    Treinos personalizados ilimitados
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-600" />
                    Análises nutricionais sem limite
                  </li>
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                    Acompanhamento de progresso
                  </li>
                </ul>

                <Button
                  onClick={() => setIsVip(true)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Ativar Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mt-12 transition-colors duration-300">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>NutriFit AI - Seu assistente de nutrição e fitness com inteligência artificial</p>
        </div>
      </footer>
    </div>
  )
}
