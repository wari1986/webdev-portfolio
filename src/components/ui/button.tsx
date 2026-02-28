import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex min-h-10 items-center justify-center rounded-md border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
  {
    variants: {
      variant: {
        ghost:
          "border-[var(--color-border)] bg-transparent text-[var(--color-fg)] hover:bg-[var(--color-panel-soft)] focus-visible:ring-[var(--color-fg)]",
      },
      size: {
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "icon",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>;

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return <button className={cn(buttonStyles({ variant, size }), className)} {...props} />;
};
