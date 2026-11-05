import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-[0.01em] transition-[transform,box-shadow,background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-tomato text-white shadow-[0_6px_0_#211C19] hover:-translate-y-0.5 hover:bg-[#d51e15] hover:shadow-[0_8px_0_#211C19]",
        secondary:
          "bg-haldi text-charcoal shadow-[0_6px_0_#211C19] hover:-translate-y-0.5 hover:bg-[#ffd21f] hover:shadow-[0_8px_0_#211C19]",
        outline:
          "border-2 border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-cream",
        cream: "bg-cream text-charcoal hover:bg-white",
        ghost:
          "border border-white/50 bg-white/10 text-white hover:bg-white hover:text-charcoal",
      },
      size: {
        md: "min-h-12 px-5 text-sm",
        lg: "min-h-14 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
