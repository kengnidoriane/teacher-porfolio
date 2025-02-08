import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AppContainerProps {
  children: ReactNode
  className?: string
}

export function AppContainer({ children, className }: AppContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  )
}