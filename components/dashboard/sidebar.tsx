"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Settings, LogOut, Menu, X, Plus } from "lucide-react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    // TODO: Implement logout with Better Auth
    console.log("Logout clicked")
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 hover:bg-accent rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border/50 p-6 transition-transform duration-300 z-30 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8 h-full flex flex-col">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <span>SyncFlow</span>
          </Link>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Calendar className="w-4 h-4" />
                My Schedule
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-2 border-t border-border/50 pt-4">
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
