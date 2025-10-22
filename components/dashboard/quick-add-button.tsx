"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskModal } from "./task-modal"

interface QuickAddButtonProps {
  onTaskAdded: (task: any) => void
}

export function QuickAddButton({ onTaskAdded }: QuickAddButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = (task: any) => {
    onTaskAdded(task)
    setIsOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>

      <TaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={handleSave} initialTask={undefined} />
    </>
  )
}
