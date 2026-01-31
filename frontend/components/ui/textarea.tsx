import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white ring-offset-void placeholder:text-muted-foreground focus-visible:outline-none focus:border-nebula-500/50 focus:bg-white/[0.02] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-all duration-300",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }
