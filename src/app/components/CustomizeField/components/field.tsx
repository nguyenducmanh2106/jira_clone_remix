
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog"
import { Input } from "@app/components/ui/input"
import { Label } from "@app/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@app/components/ui/tooltip";
import cx from "classix";
import { CSSProperties, FC, ReactNode, memo, useCallback, useMemo, useState } from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { DragSourceMonitor, useDrag } from "react-dnd";
export interface IFieldProps {
  label: string;
  index: number;
  onToggleForbidDrag?: () => void
  children?: ReactNode
}
export const Colors = {
  YELLOW: 'yellow',
  BLUE: 'blue',
}

export const Field: FC<IFieldProps> = memo(function Field({
  label,
  children,
  index
}: IFieldProps) {

  return (
    <Draggable
      draggableId={label}
      index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <>
          <div
            // className={cx("column grow shrink min-w-[200px]")}
            title="column_break_13"
            ref={(node: HTMLElement) => {
              provided.innerRef(node);
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'translate(0px, 0px)',
            }}
          >
            <div
              title=""
              className="field rounded-[6px] block bg-[#F4F5F6] border-[0.5px] border-solid border-[#C0C6CC] cursor-pointer text-sm"
            >
              <Label>{label}</Label>
              {children}
            </div>
          </div>
          {snapshot.isDragging && (<div style={{ transform: 'none !important' }}
            title="column_break_13"
          >
            <div
              title=""
              className="field rounded-[6px] block bg-[#F4F5F6] border-[0.5px] border-solid border-[#C0C6CC] cursor-pointer py-[0.5rem] px-[0.75rem] text-sm"
            >
              <Label>{label}</Label>
              {children}
            </div>
          </div>)}

        </>
      )}
    </Draggable>

  )
})