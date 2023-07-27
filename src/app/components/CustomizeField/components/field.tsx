
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog"
import { Input } from "@app/components/ui/input"
import { Label } from "@app/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@app/components/ui/tooltip";
import { CSSProperties, FC, ReactNode, memo, useCallback, useMemo, useState } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
export interface IFieldProps {
  label: string;
  onToggleForbidDrag?: () => void
  children?: ReactNode
}
export const Colors = {
  YELLOW: 'yellow',
  BLUE: 'blue',
}
// export function Field(props: IField) {
//   return (
//     <div
//       className="field rounded-[6px] block bg-[#F4F5F6] border-[0.5px] border-solid border-[#C0C6CC] cursor-pointer py-[0.5rem] px-[0.75rem] text-sm"
//       ref={drag}
//       role="SourceBox"
//     >
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Label>{props.label}</Label>
//             {children}
//           </TooltipTrigger>
//           <TooltipContent>
//             {props.label}
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     </div>
//   )
// }

export const Field: FC<IFieldProps> = memo(function Field({
  label,
  children,
}) {
  const [forbidDrag, setForbidDrag] = useState(false)
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "field",
      item: { label: "abc", key: "abc" },
      canDrag: !forbidDrag,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [forbidDrag, label],
  )

  const onToggleForbidDrag = useCallback(() => {
    setForbidDrag(!forbidDrag)
  }, [forbidDrag, setForbidDrag])


  const containerStyle = useMemo(
    () => ({
      opacity: isDragging ? 0.4 : 1,
      cursor: forbidDrag ? 'default' : 'move',
    }),
    [isDragging, forbidDrag],
  )

  return (
    <div
      title=""
      className="field rounded-[6px] block bg-[#F4F5F6] border-[0.5px] border-solid border-[#C0C6CC] cursor-pointer py-[0.5rem] px-[0.75rem] text-sm"
      ref={drag}
      role="SourceBox"
    >
      <Label>{label}</Label>
      {children}
    </div>
  )
})