"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Edit2, Trash2, CheckCircle2, Circle } from "lucide-react"
import { TaskModal } from "./task-modal"

interface Task {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  day: string
  startTime: string
  endTime: string
  completed: boolean
}

interface TimetableGridProps {
  tasks: Task[]
  onTasksChange: (tasks: Task[]) => void
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`)

const PRIORITY_COLORS = {
  high: "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400",
  medium: "bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-400",
  low: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400",
}

export function TimetableGrid({ tasks, onTasksChange }: TimetableGridProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTaskSlot, setNewTaskSlot] = useState<{ day: string; time: string } | null>(null)

  const toggleTaskCompletion = (taskId: string) => {
    onTasksChange(tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTask = (taskId: string) => {
    onTasksChange(tasks.filter((t) => t.id !== taskId))
  }

  const handleAddTask = (day: string, hour: string) => {
    setNewTaskSlot({ day, time: hour })
    setSelectedTask(null)
    setIsModalOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setNewTaskSlot(null)
    setIsModalOpen(true)
  }

  const handleSaveTask = (task: Task) => {
    if (selectedTask) {
      onTasksChange(tasks.map((t) => (t.id === selectedTask.id ? task : t)))
    } else {
      onTasksChange([...tasks, task])
    }
  }

  const getTasksForSlot = (day: string, hour: string) => {
    return tasks.filter((t) => t.day === day && t.startTime === hour)
  }

  return (
    <>
      <div className="overflow-x-auto p-6">
        <div className="min-w-full">
          {/* Header with Days */}
          <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: "80px repeat(7, 1fr)" }}>
            <div className="font-semibold text-sm text-muted-foreground">Time</div>
            {DAYS.map((day) => (
              <div key={day} className="font-semibold text-sm text-center p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="space-y-1">
            {HOURS.map((hour) => (
              <div key={hour} className="grid gap-1" style={{ gridTemplateColumns: "80px repeat(7, 1fr)" }}>
                <div className="text-xs text-muted-foreground font-medium p-2">{hour}</div>
                {DAYS.map((day) => {
                  const slotTasks = getTasksForSlot(day, hour)
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="border border-border/50 rounded-lg p-2 min-h-16 bg-card/50 hover:bg-card transition-colors"
                    >
                      {slotTasks.length > 0 ? (
                        <div className="space-y-2">
                          {slotTasks.map((task) => (
                            <Card
                              key={task.id}
                              className={`p-2 cursor-pointer border ${PRIORITY_COLORS[task.priority]} ${
                                task.completed ? "opacity-60" : ""
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <button onClick={() => toggleTaskCompletion(task.id)} className="mt-0.5 flex-shrink-0">
                                  {task.completed ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                  ) : (
                                    <Circle className="w-4 h-4" />
                                  )}
                                </button>
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-xs font-semibold truncate ${task.completed ? "line-through" : ""}`}
                                  >
                                    {task.title}
                                  </p>
                                  <p className="text-xs opacity-75 truncate">{task.description}</p>
                                </div>
                                <div className="flex gap-1 flex-shrink-0">
                                  <button
                                    onClick={() => handleEditTask(task)}
                                    className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => deleteTask(task.id)}
                                    className="p-1 hover:bg-red-500/20 rounded"
                                  >
                                    <Trash2 className="w-3 h-3 text-red-500" />
                                  </button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddTask(day, hour)}
                          className="w-full h-full text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          + Add task
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTask(null)
          setNewTaskSlot(null)
        }}
        onSave={handleSaveTask}
        initialTask={selectedTask || (newTaskSlot ? { day: newTaskSlot.day, startTime: newTaskSlot.time } : undefined)}
      />
    </>
  )
}
