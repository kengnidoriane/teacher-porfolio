import { cn } from "@/lib/utils"

type SpacerSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

interface SpacerProps {
  size?: SpacerSize
  className?: string
}

const spacerSizes: Record<SpacerSize, string> = {
  "2xs": "h-2 sm:h-3",
  "xs": "h-3 sm:h-4",
  "sm": "h-4 sm:h-6",
  "md": "h-6 sm:h-8",
  "lg": "h-8 sm:h-12",
  "xl": "h-12 sm:h-16",
  "2xl": "h-16 sm:h-24",
}

export function Spacer({ size = "md", className }: SpacerProps) {
  return <div className={cn(spacerSizes[size], className)} aria-hidden="true" />
}