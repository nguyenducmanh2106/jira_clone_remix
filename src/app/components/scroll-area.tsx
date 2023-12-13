import { cn } from "@/src/lib/utils";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

export const ScrollArea = ({
  className,
  children,
}: ScrollAreaProps): JSX.Element => (
  <ScrollAreaPrimitive.Root
    type="hover"
    scrollHideDelay={400}
    className="h-full w-full overflow-y-scroll scrollbar-hide"
  >
    <ScrollAreaPrimitive.Viewport className={cn("h-full w-full", className)}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar
      orientation="vertical"
      className={cn(
        "flex w-2 touch-none select-none rounded-full bg-grey-400 duration-150 ease-out hover:bg-grey-600 dark:bg-dark-100"
      )}
    >
      <ScrollAreaPrimitive.Thumb
        className={cn(
          "relative h-full flex-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-font-grey",
          "before:absolute before:top-1/2 before:left-1/2"
        )}
      />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
);

interface ScrollAreaProps {
  className?: string;
  children: JSX.Element | JSX.Element[];
}
