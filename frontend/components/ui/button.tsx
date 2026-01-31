import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
    {
        variants: {
            variant: {
                default: "bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 hover:border-nebula-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]",
                primary: "bg-nebula-gradient text-white shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-[1.02] border border-white/20",
                secondary: "bg-void border border-white/10 text-starlight hover:bg-white/5",
                ghost: "hover:bg-white/5 hover:text-white text-gray-400",
                outline: "border border-white/20 bg-transparent hover:bg-white/5 hover:border-nebula-400/50 text-white",
                link: "text-nebula-400 underline-offset-4 hover:underline",
                liquid: "relative bg-transparent text-white border border-white/20 overflow-hidden hover:border-nebula-500 transition-colors duration-300 before:absolute before:inset-0 before:bg-nebula-gradient before:translate-x-[-100%] hover:before:translate-x-[0%] before:transition-transform before:duration-300 before:-z-10 z-10"
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 rounded-md px-4 text-xs",
                lg: "h-14 rounded-xl px-10 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
