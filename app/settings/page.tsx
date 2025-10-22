"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [timezone, setTimezone] = useState("UTC")
  const [workStartTime, setWorkStartTime] = useState("09:00")
  const [workEndTime, setWorkEndTime] = useState("17:00")
  const [breakDuration, setBreakDuration] = useState("30")

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="md:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your preferences and account</p>
          </div>
        </div>

        <div className="grid gap-6 max-w-2xl">
          {/* Work Hours */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Work Hours</CardTitle>
              <CardDescription>Set your preferred working hours for scheduling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <Input type="time" value={workStartTime} onChange={(e) => setWorkStartTime(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Time</label>
                  <Input type="time" value={workEndTime} onChange={(e) => setWorkEndTime(e.target.value)} />
                </div>
              </div>
              <Button>Save Work Hours</Button>
            </CardContent>
          </Card>

          {/* Timezone */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Timezone</CardTitle>
              <CardDescription>Select your timezone for accurate scheduling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Standard Time</option>
                <option value="CST">Central Standard Time</option>
                <option value="MST">Mountain Standard Time</option>
                <option value="PST">Pacific Standard Time</option>
              </select>
              <Button>Save Timezone</Button>
            </CardContent>
          </Card>

          {/* Break Duration */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Break Duration</CardTitle>
              <CardDescription>Default break time between tasks (in minutes)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="number"
                value={breakDuration}
                onChange={(e) => setBreakDuration(e.target.value)}
                min="5"
                max="120"
              />
              <Button>Save Break Duration</Button>
            </CardContent>
          </Card>

          {/* Account */}
          <Card className="border-border/50 border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
