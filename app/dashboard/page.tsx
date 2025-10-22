"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TimetableGrid } from "@/components/dashboard/timetable-grid"
import { AITaskInput } from "@/components/dashboard/ai-task-input"
import { TaskStats } from "@/components/dashboard/task-stats"
import { QuickAddButton } from "@/components/dashboard/quick-add-button"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Moon, Sun } from "lucide-react"

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly sync with the team",
      priority: "high" as const,
      day: "Monday",
      startTime: "09:00",
      endTime: "10:00",
      completed: false,
    },
    {
      id: "2",
      title: "Code Review",
      description: "Review pull requests",
      priority: "medium" as const,
      day: "Monday",
      startTime: "10:30",
      endTime: "11:30",
      completed: false,
    },
    {
      id: "3",
      title: "Lunch Break",
      description: "Lunch time",
      priority: "low" as const,
      day: "Monday",
      startTime: "12:00",
      endTime: "13:00",
      completed: false,
    },
    {
      id: "4",
      title: "Project Planning",
      description: "Plan next sprint",
      priority: "high" as const,
      day: "Tuesday",
      startTime: "14:00",
      endTime: "15:30",
      completed: false,
    },
    {
      id: "5",
      title: "Documentation",
      description: "Update API docs",
      priority: "medium" as const,
      day: "Wednesday",
      startTime: "10:00",
      endTime: "11:00",
      completed: true,
    },
  ])

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const handleAddTask = (task: any) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }])
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-64 p-4 md:p-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-balance">My Schedule</h1>
            <p className="text-muted-foreground mt-2">Manage your weekly timetable with AI assistance</p>
          </div>
          <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-lg bg-transparent">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>

        {/* AI Task Input */}
        <div className="mb-8">
          <AITaskInput onTasksGenerated={(newTasks) => setTasks([...tasks, ...newTasks])} />
        </div>

        {/* Task Stats */}
        <div className="mb-8">
          <TaskStats tasks={tasks} />
        </div>

        {/* Timetable Grid */}
        <Card className="border-border/50 overflow-hidden">
          <TimetableGrid tasks={tasks} onTasksChange={setTasks} />
        </Card>
      </main>

      {/* Quick Add Button */}
      <QuickAddButton onTaskAdded={handleAddTask} />
    </div>
  )
}
