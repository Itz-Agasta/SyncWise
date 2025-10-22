"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AITaskConfirmation } from "./ai-task-confirmation"
import { Sparkles, Send, Loader } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  day: string
  startTime: string
  endTime: string
  completed: boolean
}

interface AITaskInputProps {
  onTasksGenerated: (tasks: Task[]) => void
}

export function AITaskInput({ onTasksGenerated }: AITaskInputProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [generatedTasks, setGeneratedTasks] = useState<Task[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/ai/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || "Failed to generate schedule. Please try again.")
        return
      }

      // Set tasks and show confirmation modal
      setGeneratedTasks(data.tasks || [])
      setShowConfirmation(true)
    } catch (err) {
      setError("Failed to connect to AI service. Please try again.")
      console.error("Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirm = (tasks: Task[]) => {
    onTasksGenerated(tasks)
    setShowConfirmation(false)
    setInput("")
    setGeneratedTasks([])
  }

  const handleCancel = () => {
    setShowConfirmation(false)
    setGeneratedTasks([])
  }

  return (
    <>
      <div className="space-y-2">
        <Card className="border-border/50 p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-background">
              <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
              <Input
                placeholder="Describe your tasks... e.g., 'I have a DSA exam at 6pm' or 'Meeting at 2pm for 1 hour'"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="border-0 bg-transparent focus-visible:ring-0 p-0"
              />
            </div>
            <Button type="submit" disabled={isLoading || !input.trim()} className="gap-2">
              {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </Card>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {/* Task Confirmation Modal */}
      <AITaskConfirmation
        tasks={generatedTasks}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={showConfirmation}
      />
    </>
  )
}
