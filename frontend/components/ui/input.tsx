import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className="relative group w-full">
                <input
                    type={type}
                    className={cn(
                        "flex h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-base text-white ring-offset-void file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:border-nebula-500/50 focus:bg-white/[0.02] focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {/* Animated bottom line for extra flair */}
                <div className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-nebula-gradient transform -translate-x-1/2 transition-all duration-500 group-focus-within:w-full opacity-50" />
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
