import { FieldDto } from "@/src/api"
import { ItemTypes } from "@app/components/testm/ItemTypes"
import { nestElementType } from "@domain/types/nestElement"
import cx from 'classix'
import type { FC } from 'react'
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import SectionField from "./section-field"
import { Cross2Icon, MoveIcon, PlusIcon } from "@radix-ui/react-icons"
import { addColumn, removeColumn } from "@app/store/Slice/fieldSectionSlice"

export interface DragItem {
    type: string
}

export interface FormBuilderProps {
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

const SectionColumn: FC<FormBuilderProps> = memo(function SectionColumn({
    fields,
    tabName,
    sectionName,
    tabIndex,
    sectionIndex,
    columnIndex,
    isScrollable,
    isCombineEnabled,
    useClone,
}: FormBuilderProps) {

    const dispatch = useDispatch()
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isClick, setIsClick] = useState<boolean>(false);
    const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
    const ref = useRef<HTMLElement>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const fieldFilterByPositions: nestElementType = useMemo(() => {
        const resultFilters: nestElementType = { ...fields }

        return resultFilters;

    }, [fields])

    const handleFocus = () => {
        setIsClick(true)
    };
    const handleBlur = () => {
        setIsClick(false)
    };
    const handAddColumn = (columnIndex: number) => {
        dispatch(addColumn({
            currentTabIndex: tabIndex,
            currentSectionIndex: sectionIndex,
            columnIndex: columnIndex
        }))
    }

    const handRemoveColumn = (columnIndex: number) => {
        dispatch(removeColumn({
            currentTabIndex: tabIndex,
            currentSectionIndex: sectionIndex,
            columnIndex: columnIndex
        }))
    }

    return (
        <Draggable
            draggableId={`${tabIndex}:${sectionIndex}:${fieldFilterByPositions.fieldname}`}
            index={columnIndex as number}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <div
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => ref.current?.focus()}
                    className={cx("column grow shrink min-w-[200px]", isHovered || isDraggingOver || snapshot.isDragging ? "hovered" : "")}
                    title="column_break_13"
                    ref={(node: HTMLElement) => {
                        provided.innerRef(node);
                        ref.current = node;
                    }}
                    {...provided.draggableProps}  {...provided.dragHandleProps}
                >
                    <div className={cx(isClick ? 'flex' : 'hidden', "column-header")}>
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
                        <div className={cx("column-actions")}>
                            <button
                                className="btn btn-xs btn-icon p-[4px]"
                                title="Move the current column & the following columns to a new section"
                            >
                                <MoveIcon />
                            </button>
                            <button
                                className="btn btn-xs btn-icon p-[4px]"
                                title="Add Column"
                                onClick={() => handAddColumn(columnIndex)}
                            >
                                <PlusIcon />
                            </button>
                            <button
                                className="btn btn-xs btn-icon p-[4px]"
                                title="Remove Column"
                                onClick={() => handRemoveColumn(columnIndex)}
                            >
                                <Cross2Icon />
                            </button>
                        </div>
                    </div>
                    <div className="column-container grow shrink" >
                        <Droppable
                            droppableId={`${tabIndex}:${sectionIndex}:${columnIndex}:${fieldFilterByPositions.fieldname}`}
                            type={ItemTypes.FIELD}
                            ignoreContainerClipping={false}
                            isDropDisabled={false}
                            isCombineEnabled={isCombineEnabled}
                        // renderClone={
                        //     useClone
                        //         ? (provided, snapshot, descriptor) => {

                        //             return (
                        //                 <SectionField
                        //                     className='w-[20px]'
                        //                     key={descriptor.draggableId}
                        //                     id={descriptor.draggableId}
                        //                     tabName={0}
                        //                     sectionName={0}
                        //                     columnName={descriptor.draggableId}
                        //                     text={'hello 1'}
                        //                     fieldIndex={descriptor.source.index}
                        //                     tabIndex={0}
                        //                     sectionIndex={0}
                        //                     columnIndex={0}
                        //                     isDragging={snapshot.isDragging}
                        //                     isGroupedOver={Boolean(snapshot.combineTargetFor)}
                        //                     provided={provided}
                        //                     isClone={useClone}
                        //                 />
                        //             )
                        //         }
                        //         : null
                        // }
                        >
                            {(
                                dropProvided: DroppableProvided,
                                dropSnapshot: DroppableStateSnapshot,
                            ) => {
                                setIsDraggingOver(dropSnapshot.isDraggingOver)
                                return (
                                    <div className="dropzone h-full" ref={dropProvided.innerRef}
                                        {...dropProvided.droppableProps}
                                    >
                                        {fieldFilterByPositions.components?.map((field: FieldDto, index) => (
                                            <Draggable key={field.fieldname} draggableId={field.fieldname as string} index={index}>
                                                {(
                                                    dragProvided: DraggableProvided,
                                                    dragSnapshot: DraggableStateSnapshot,
                                                ) => {
                                                    return (
                                                        <div>
                                                            <SectionField
                                                                className="field-form"
                                                                key={field.fieldname}
                                                                id={field.fieldname as string}
                                                                tabName={tabName}
                                                                sectionName={sectionName}
                                                                columnName={fieldFilterByPositions.fieldname as string}
                                                                text={field.label as string}
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
                                                    )
                                                }}
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


export default SectionColumn
