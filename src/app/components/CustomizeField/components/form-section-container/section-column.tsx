import { CopyIcon, Cross2Icon } from "@radix-ui/react-icons"
import SectionField from "./section-field"
import { Button } from '@app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@app/components/ui/card'
import { Input } from '@app/components/ui/input'
import { Label } from '@app/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import type { FC } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import type { DropTargetMonitor } from 'react-dnd'
import { useDrag, useDrop } from 'react-dnd'
import cx from 'classix'
import { FieldDto } from "@/src/api"
import { FIELD_TYPE } from "@/src/constants"
import { nestElementType } from "@domain/types/nestElement"
import React from "react"
import { ItemTypes } from "@app/components/testm/ItemTypes"
import { useDispatch } from "react-redux"
import { moveItem } from "@app/store/Slice/fieldSectionSlice"
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd"

export interface DragItem {
    type: string
}

export interface FormBuilderProps {
    onDrop: (item: any) => void
    fields: nestElementType,
    isScrollable?: boolean,
    isCombineEnabled?: boolean,
    useClone?: boolean,
    tabName: string,
    sectionName: string,
    tabIndex: number,
    sectionIndex: number,
    columnIndex: number,
}


const SectionColumnDrag: FC<FormBuilderProps> = memo(function SectionColumnDrag({
    onDrop,
    fields,
    // listId,
    tabName,
    sectionName,
    tabIndex,
    sectionIndex,
    columnIndex,
    isScrollable,
    isCombineEnabled,
    useClone,
}: FormBuilderProps) {
    // const [{ isOver, draggingColor, canDrop }, drop] = useDrop(
    //     () => ({
    //         accept: [ItemTypes.FIELD],
    //         hover(item: DragItem, monitor) {
    //             console.log(item)
    //             // onDrop(_item)
    //             // console.log(item)
    //             // const objMove = {
    //             //     fromTab: item.tabName,
    //             //     fromIndexTab: item.tabIndex,
    //             //     toTab: tabName,
    //             //     toIndexTab: tabIndex,
    //             //     fromSection: item.sectionName,
    //             //     fromIndexSection: item.sectionIndex,
    //             //     toSection: sectionName,
    //             //     toIndexSection: sectionIndex,
    //             //     fromColumn: "item.columnName",
    //             //     fromIndexColumn: item.columnIndex,
    //             //     toColumn: "columnName",
    //             //     toIndexColumn: columnIndex,
    //             //     fromIndexField: item.fieldIndex,
    //             //     toIndexField: 0,
    //             //     fieldDnD: ItemTypes.FIELD
    //             // }
    //             // dispatch(moveItem(objMove))
    //             // return undefined
    //         },
    //         collect: (monitor: DropTargetMonitor) => ({
    //             isOver: monitor.isOver(),
    //             canDrop: monitor.canDrop(),
    //             draggingColor: monitor.getItemType() as string,
    //         }),
    //     }),
    //     [onDrop],
    // )

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    // const [, dragRef] = useDrag({
    //     type: ItemTypes.FIELD,
    //     // item: { id, index },
    //     item: {},
    // });

    const dispatch = useDispatch()
    // const [, dropRef] = useDrop({
    //     accept: ItemTypes.FIELD,
    //     hover: (item: FieldDto) => {
    //         // dispatch(moveItem({}))

    //         // if (item.id !== id) {

    //         //     // moveItem(item.listId, item.index, listId, index);
    //         //     // item.idx = index;
    //         //     // item.listId = listId;
    //         // }
    //     },
    // });
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const fieldFilterByPositions: nestElementType = useMemo(() => {
        const resultFilters: nestElementType = { ...fields }

        return resultFilters;

    }, [fields])

    // console.log(fieldFilterByPositions)

    return (
        <Draggable
            draggableId={`${fieldFilterByPositions.tabIndex}:${fieldFilterByPositions.sectionIndex}:${fieldFilterByPositions.fieldname}`}
            index={columnIndex as number}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <div
                    // ref={(node) => dragRef(dropRef(node))}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={cx("column flex-auto", isHovered ? "hovered" : "")}
                    title="column_break_13"
                    ref={provided.innerRef} {...provided.draggableProps}  {...provided.dragHandleProps}
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
                    <div className="column-container flex-auto" >
                        <Droppable
                            // droppableId={fieldFilterByPositions.fieldname as string}
                            droppableId={`${tabIndex}:${sectionIndex}:${columnIndex}:${fieldFilterByPositions.fieldname}`}
                            type={ItemTypes.FIELD}
                            ignoreContainerClipping={false}
                            isDropDisabled={false}
                            isCombineEnabled={isCombineEnabled}
                        // renderClone={
                        //     useClone
                        //         ? (provided, snapshot, descriptor) => (
                        //             <div>hello</div>
                        //             // <QuoteItem
                        //             //     quote={quotes[descriptor.source.index]}
                        //             //     provided={provided}
                        //             //     isDragging={snapshot.isDragging}
                        //             //     isClone
                        //             // />
                        //         )
                        //         : null
                        // }
                        >
                            {(
                                dropProvided: DroppableProvided,
                                dropSnapshot: DroppableStateSnapshot,
                            ) => {
                                console.log(dropProvided)
                                return (
                                    <div className="dropzone h-full" ref={dropProvided.innerRef}
                                        {...dropProvided.droppableProps}
                                    >
                                        {fieldFilterByPositions.components?.map((field: FieldDto, index) => (
                                            <Draggable key={field.fieldname} draggableId={field.fieldname as string} index={index}>
                                                {(
                                                    dragProvided: DraggableProvided,
                                                    dragSnapshot: DraggableStateSnapshot,
                                                ) => (
                                                    <div>
                                                        <SectionField
                                                            key={field.fieldname}
                                                            id={field.fieldname}
                                                            tabName={tabName}
                                                            sectionName={sectionName}
                                                            columnName={fieldFilterByPositions.fieldname}
                                                            text={field.fieldname}
                                                            fieldIndex={index}
                                                            tabIndex={tabIndex}
                                                            sectionIndex={sectionIndex}
                                                            columnIndex={columnIndex}
                                                            isDragging={dragSnapshot.isDragging}
                                                            isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                                                            provided={dragProvided}
                                                            isClone={true}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>

                                        ))}
                                        <div>{dropProvided.placeholder}</div>
                                        
                                    </div>
                                )
                            }}
                        </Droppable>
                    </div>
                </div>
            )}
        </Draggable>

    )
})


// eslint-disable-next-line react/display-name
const SectionColumn = ({ list, setList, tabName, sectionName, tabIndex, sectionIndex, columnIndex, isScrollable,
    isCombineEnabled,
    useClone }) => {
    const handleDrop = useCallback(
        (field: FieldDto) => {
            // console.log(field)
            console.log("onDrop")
            console.log({ list, field, tabName, sectionName, tabIndex, sectionIndex, columnIndex })


        },
        [],
    )

    // console.log("column render")
    return (
        <SectionColumnDrag
            fields={list}
            tabName={tabName}
            sectionName={sectionName}
            onDrop={handleDrop}
            tabIndex={tabIndex}
            sectionIndex={sectionIndex}
            columnIndex={columnIndex}
            isScrollable={isScrollable}
            isCombineEnabled={isCombineEnabled}
            useClone={useClone}
        />
    )
}

function areEqual(prevProps: any, nextProps: any) {
    /* Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
    if (prevProps.sectionName == nextProps.sectionName) return true;
    return false;
}

export default React.memo(SectionColumn)
