"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Check } from "lucide-react"

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

interface AITaskConfirmationProps {
  tasks: Task[]
  onConfirm: (tasks: Task[]) => void
  onCancel: () => void
  isOpen: boolean
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const priorities = ["low", "medium", "high"]

export function AITaskConfirmation({ tasks, onConfirm, onCancel, isOpen }: AITaskConfirmationProps) {
  const [editedTasks, setEditedTasks] = useState<Task[]>(tasks)

  // Update editedTasks when tasks prop changes
  useEffect(() => {
    setEditedTasks(tasks)
  }, [tasks, isOpen])

  const handleTaskChange = (index: number, field: keyof Task, value: string | "low" | "medium" | "high") => {
    const updated = [...editedTasks]
    updated[index] = { ...updated[index], [field]: value }
    setEditedTasks(updated)
  }

  const handleConfirm = () => {
    onConfirm(editedTasks)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto border-border/50">
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Review Generated Tasks</h2>
            <button
              onClick={onCancel}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {editedTasks.map((task, index) => (
              <div key={task.id} className="border border-border/50 rounded-lg p-4 space-y-3">
                {/* Title */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Task Title</label>
                  <Input
                    value={task.title}
                    onChange={(e) => handleTaskChange(index, "title", e.target.value)}
                    className="mt-1"
                    placeholder="Task title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <textarea
                    value={task.description}
                    onChange={(e) => handleTaskChange(index, "description", e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={2}
                    placeholder="Task description"
                  />
                </div>

                {/* Day, Time, Priority */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Day</label>
                    <select
                      value={task.day}
                      onChange={(e) => handleTaskChange(index, "day", e.target.value)}
                      className="mt-1 w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Start Time</label>
                    <Input
                      type="time"
                      value={task.startTime}
                      onChange={(e) => handleTaskChange(index, "startTime", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">End Time</label>
                    <Input
                      type="time"
                      value={task.endTime}
                      onChange={(e) => handleTaskChange(index, "endTime", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Priority</label>
                  <select
                    value={task.priority}
                    onChange={(e) => handleTaskChange(index, "priority", e.target.value as "low" | "medium" | "high")}
                    className="mt-1 w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="flex-1 gap-2">
              <Check className="w-4 h-4" />
              Add to Schedule
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
