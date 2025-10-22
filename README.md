#  SyncWise- AI-Powered Intelligent Scheduling Application

A sophisticated scheduling application that eliminates the friction of manual timetable organization. Users describe their tasks, activities, and commitments in natural language to an AI assistant, which intelligently generates optimized schedules respecting priority levels and time constraints.

## Features

### Core Features
- **AI-Powered Scheduling**: Describe tasks in natural language and let AI create optimized schedules
- **Interactive Weekly Timetable**: Professional grid-based interface with 7-day weekly view and 24-hour time slots
- **Manual Task Management**: Add, edit, and delete tasks with full control over scheduling
- **Task Completion Tracking**: Mark tasks as complete with visual distinction
- **Priority Levels**: Organize tasks by high, medium, and low priority
- **Theme Switching**: Light and dark mode support with persistent preferences
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices

### Advanced Features
- **AI Schedule Updates**: Request AI to re-optimize schedules with new constraints
- **Task Statistics**: Quick overview of completed, pending, and high-priority tasks
- **Settings Management**: Configure work hours, timezone, and break preferences
- **Quick Add Button**: Floating action button for rapid task creation
- **Sidebar Navigation**: Easy access to main features and settings

## Tech Stack

### Frontend
- **Next.js 15+** with App Router for modern React development
- **shadcn/ui** component library for consistent, accessible UI
- **Tailwind CSS v4** for utility-first styling
- **Lucide React** for professional icons
- **TypeScript** for type safety

### Backend & APIs
- **Next.js API Routes** for backend endpoints
- **Groq AI API** for natural language processing (via Vercel AI SDK)
- **Vercel AI SDK** for standardized AI integration

### Database (Ready for Integration)
- **Neon** PostgreSQL database
- **Drizzle ORM** for type-safe database operations

### Authentication (Ready for Integration)
- **Better Auth** for email/password and social sign-in

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── auth/
│   │   ├── login/page.tsx       # Login page
│   │   ├── signup/page.tsx      # Signup page
│   │   └── layout.tsx           # Auth layout
│   ├── dashboard/
│   │   └── page.tsx             # Main dashboard
│   ├── settings/
│   │   └── page.tsx             # Settings page
│   └── api/
│       ├── tasks/route.ts       # Tasks API
│       └── ai/schedule/route.ts # AI scheduling API
├── components/
│   ├── ui/                      # shadcn/ui components
│   └── dashboard/
│       ├── sidebar.tsx          # Sidebar navigation
│       ├── timetable-grid.tsx   # Weekly timetable
│       ├── task-modal.tsx       # Task creation/editing
│       ├── ai-task-input.tsx    # AI input interface
│       ├── task-stats.tsx       # Statistics cards
│       └── quick-add-button.tsx # Floating action button
├── middleware.ts                # Authentication middleware
└── README.md                    # This file
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd syncwise
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
bun install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
# or
bun dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
# Groq AI API (for AI scheduling)
GROQ_API_KEY=your_groq_api_key

# Neon Database (for data persistence)
DATABASE_URL=your_neon_database_url

# Better Auth (for authentication)
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Optional: Vercel AI Gateway
VERCEL_AI_GATEWAY_TOKEN=your_gateway_token
\`\`\`
