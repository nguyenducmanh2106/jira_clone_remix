// import { HiFlag } from "react-icons/hi";
import { cn } from "@/src/lib/utils";
import { PriorityId } from "@domain/priority";
import { FlagIcon } from "lucide-react";

export const PriorityIcon = ({
  priority,
  size = 18,
}: PriorityIconProps): JSX.Element => (
  <span
    className={cn(
      "flex",
      priority === "low" && "text-success-main",
      priority === "medium" && "text-warn-main",
      priority === "high" && "text-error-main"
    )}
  >
    <FlagIcon size={size} />
  </span>
);

interface PriorityIconProps {
  priority: PriorityId;
  size?: number;
}
