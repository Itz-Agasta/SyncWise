import { type NextRequest, NextResponse } from "next/server"

interface ParsedTask {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  day: string
  startTime: string
  endTime: string
  completed: boolean
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt", success: false }, { status: 400 })
    }

    const groqApiKey = process.env.GROQ_API_KEY
    if (!groqApiKey) {
      return NextResponse.json({ error: "API key not configured", success: false }, { status: 500 })
    }

    // Call Groq AI API to parse the user input
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: `You are a task scheduling assistant. Parse natural language task descriptions and extract structured task information.
            
            Return a JSON array with tasks. Each task must have:
            - title: A concise task name (string)
            - description: Full task description (string)
            - priority: one of "low", "medium", "high" (string)
            - day: Day of the week (string, e.g., "Monday", "Tuesday")
            - startTime: Time in HH:MM format (24-hour) (string)
            - endTime: Time in HH:MM format (24-hour) (string)
            - completed: false (boolean)
            
            Extract the actual time from user input. Convert 12-hour to 24-hour format if needed.
            If day is not specified, use the current weekday context or "Monday" as default.
            If duration is not specified, assume 1 hour.
            
            Return ONLY valid JSON, no markdown formatting or extra text.`,
          },
          {
            role: "user",
            content: `Parse this task description and return JSON: "${prompt}"`,
          },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    })

    if (!groqResponse.ok) {
      const errorData = await groqResponse.text()
      console.error("Groq API error:", errorData)
      return NextResponse.json({ error: "AI service error", success: false }, { status: 500 })
    }

    const groqData = await groqResponse.json()
    const aiContent = groqData.choices?.[0]?.message?.content

    if (!aiContent) {
      return NextResponse.json({ error: "No response from AI", success: false }, { status: 500 })
    }

    // Parse the AI response
    let generatedTasks: ParsedTask[] = []
    try {
      // Extract JSON from the response (it might have extra text)
      const jsonMatch = aiContent.match(/\[[\s\S]*\]/);
      const jsonStr = jsonMatch ? jsonMatch[0] : aiContent
      generatedTasks = JSON.parse(jsonStr)

      // Validate the structure
      if (!Array.isArray(generatedTasks)) {
        generatedTasks = [generatedTasks]
      }

      generatedTasks = generatedTasks.map((task: any) => ({
        id: Date.now().toString() + Math.random(),
        title: task.title || "Untitled Task",
        description: task.description || prompt,
        priority: (task.priority || "medium") as "low" | "medium" | "high",
        day: task.day || "Monday",
        startTime: task.startTime || "09:00",
        endTime: task.endTime || "10:00",
        completed: false,
      }))
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError, "Content:", aiContent)
      // Fallback: create a task from the prompt
      generatedTasks = [
        {
          id: Date.now().toString(),
          title: "Review Generated Task",
          description: prompt,
          priority: "medium",
          day: "Monday",
          startTime: "09:00",
          endTime: "10:00",
          completed: false,
        },
      ]
    }

    return NextResponse.json({
      tasks: generatedTasks,
      success: true,
    })
  } catch (error) {
    console.error("AI scheduling error:", error)
    return NextResponse.json({ error: "Failed to generate schedule", success: false }, { status: 500 })
  }
}
