// import { FaCheckSquare } from "react-icons/fa";
import { cn } from "@/src/lib/utils";
import { CheckSquareIcon } from "lucide-react";

export const TaskIcon = ({
  size = 24,
  className = "",
}: IconProps): JSX.Element => (
  <span className="relative flex items-center before:absolute before:inset-1/2 before:h-3/4 before:w-3/4 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white">
    <CheckSquareIcon
      fill="#4BADE8"
      className={cn("relative", className)}
      size={size}
    />
  </span>
);

interface IconProps {
  size?: number;
  className?: string;
}
