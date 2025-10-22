"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, AlertCircle, Clock } from "lucide-react"

interface TaskStatsProps {
  tasks: any[]
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const completed = tasks.filter((t) => t.completed).length
  const highPriority = tasks.filter((t) => t.priority === "high").length
  const pending = tasks.filter((t) => !t.completed).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-border/50 p-4 hover:border-primary/50 transition-colors">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-3xl font-bold">{completed}</p>
            <p className="text-xs text-muted-foreground">{Math.round((completed / tasks.length) * 100) || 0}% done</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-green-500/50" />
        </div>
      </Card>

      <Card className="border-border/50 p-4 hover:border-primary/50 transition-colors">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-3xl font-bold">{pending}</p>
            <p className="text-xs text-muted-foreground">Tasks to complete</p>
          </div>
          <Clock className="w-8 h-8 text-blue-500/50" />
        </div>
      </Card>

      <Card className="border-border/50 p-4 hover:border-primary/50 transition-colors">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">High Priority</p>
            <p className="text-3xl font-bold">{highPriority}</p>
            <p className="text-xs text-muted-foreground">Urgent tasks</p>
          </div>
          <AlertCircle className="w-8 h-8 text-red-500/50" />
        </div>
      </Card>
    </div>
  )
}
