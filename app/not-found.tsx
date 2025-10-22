import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background px-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/">
            <Button className="w-full">Go Home</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="w-full bg-transparent">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
