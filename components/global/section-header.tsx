import { cn } from "@/lib/utils"

interface SectionHeaderProps {
    title: string
    description?: string
    className?: string
}

export function SectionHeader({ title, description, className }: Readonly<SectionHeaderProps>) {
    return (
        <div className={cn("mx-auto min-h-[30vh] flex flex-col justify-center items-center gap-3 bg-muted", className)}>
            <h2 className="md:text-4xl text-2xl [font-family:var(--font-lobster)]">{title}</h2>
            {description && <p className="text-gray-600">{description}</p>}
        </div>
    )
}