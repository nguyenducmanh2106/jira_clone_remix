import { CopyIcon, Cross2Icon } from "@radix-ui/react-icons"
import { SectionField } from "./section-field"
import { Button } from '@app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@app/components/ui/card'
import { Input } from '@app/components/ui/input'
import { Label } from '@app/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import type { FC } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import type { DropTargetMonitor } from 'react-dnd'
import { useDrop } from 'react-dnd'
import cx from 'classix'
import { FieldDto } from "@/src/api"
import { FIELD_TYPE } from "@/src/constants"

export interface DragItem {
    type: string
}

export interface FormBuilderProps {
    onDrop: (item: any) => void
    fields: FieldDto[],
    moveItem: (fromListId, fromIndex, toListId, toIndex) => void,
    listId: string,
    positionFormSection: number,
    positionSectionColumn: number
}


const SectionColumnDrag: FC<FormBuilderProps> = memo(function SectionColumnDrag({
    onDrop,
    fields,
    moveItem,
    listId,
    positionFormSection,
    positionSectionColumn
}: FormBuilderProps) {
    const [{ isOver, draggingColor, canDrop }, drop] = useDrop(
        () => ({
            accept: ["field"],
            drop(_item: DragItem, monitor) {
                onDrop(_item)
                return undefined
            },
            collect: (monitor: DropTargetMonitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                draggingColor: monitor.getItemType() as string,
            }),
        }),
        [onDrop],
    )

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const fieldFilterByPositions: FieldDto[] = useMemo(() => {
        const resultFilters: FieldDto[] = []
        switch (positionFormSection) {
            case 0:
                if (positionSectionColumn == 0) {
                    for (let idx = 0; idx < fields.length; idx++) {
                        const field = fields[idx];
                        if (field.fieldtype == FIELD_TYPE.SECTION_BREAK) break;
                        if (field.fieldtype == FIELD_TYPE.COLUMN_BREAK) break;
                        resultFilters.push(field)
                    }

                }

                break;
            default:
                if (positionSectionColumn == 0) {
                    for (let idx = 0; idx < fields.length; idx++) {
                        const field = fields[idx];
                        if (field.fieldtype == FIELD_TYPE.SECTION_BREAK) break;
                        if (field.fieldtype == FIELD_TYPE.COLUMN_BREAK) break;
                        resultFilters.push(field)
                    }

                }
                break;
        }
        return resultFilters;

    }, [positionFormSection, positionSectionColumn, fields])

    return (

        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cx("column", isHovered ? "hovered" : "")}
            title="column_break_13"
        >
            <div className="column-header">
                <div className="column-label">
                    <div
                        title="Double click to edit label"
                    >
                        <i data-v-a015357f="" className="text-muted">
                            No Label
                        </i>
                        <span data-v-a015357f="" className="hidden-span" />
                        <span data-v-a015357f="" className="hidden-span">
                            Column Title
                        </span>
                    </div>
                </div>
                <div className="column-actions">
                    <button
                        className="btn btn-xs btn-icon"
                        title="Move the current column & the following columns to a new section"
                    >
                        <div >
                            <svg className="icon  icon-sm" style={{}}>
                                <use className="" href="#icon-move" />
                            </svg>
                        </div>
                    </button>
                    <button
                        data-v-31db23b4=""
                        className="btn btn-xs btn-icon"
                        title="Add Column"
                    >
                        <div data-v-31db23b4="">
                            <svg className="icon  icon-sm" style={{}}>
                                <use className="" href="#icon-add" />
                            </svg>
                        </div>
                    </button>
                    <button
                        data-v-31db23b4=""
                        className="btn btn-xs btn-icon"
                        title="Remove Column"
                    >
                        <div data-v-31db23b4="">
                            <svg className="icon  icon-sm" style={{}}>
                                <use className="" href="#icon-remove" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <div className="column-container">
                <div
                    ref={drop}
                    role="TargetBox"
                >
                    {/* {canDrop && <p>Drop here.</p>} */}

                    {fieldFilterByPositions.map((field, index) => (
                        <SectionField key={field.idx} id={field.id} text={field.fieldname} index={field.id} listId={listId} moveItem={moveItem} />
                    ))}
                </div>
            </div>
        </div>
    )
})


export const SectionColumn = ({ list, setList, moveItem, listId, positionFormSection, positionSectionColumn }) => {
    const handleDrop = useCallback(
        (field: FieldDto) => {
            list.push(field)
            setList(list)
        },
        [],
    )
    // const [fields, setFields] = useState<FieldDto[]>([
    //     { idx: 1 },
    //     { idx: 2 },
    // ])

    return (
        <SectionColumnDrag
            fields={list}
            positionFormSection={positionFormSection}
            positionSectionColumn={positionSectionColumn}
            onDrop={handleDrop}
            moveItem={moveItem}
            listId={listId}
        />
    )
}
