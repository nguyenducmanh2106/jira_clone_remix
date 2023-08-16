import { FieldDto } from "@/src/api"
import { ItemTypes } from "@app/components/testm/ItemTypes"
import { nestElementType } from "@domain/types/nestElement"
import cx from 'classix'
import type { FC } from 'react'
import React, { memo, useMemo, useState } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import SectionField from "./section-field"

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

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const dispatch = useDispatch()

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
                    className={cx("column grow shrink", isHovered ? "hovered" : "")}
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
                    <div className="column-container grow shrink" >
                        <Droppable
                            droppableId={`${tabIndex}:${sectionIndex}:${columnIndex}:${fieldFilterByPositions.fieldname}`}
                            type={ItemTypes.FIELD}
                            ignoreContainerClipping={true}
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
                                // console.log(dropProvided)
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
                                                            className="field-form"
                                                            key={field.fieldname}
                                                            id={field.fieldname}
                                                            tabName={tabName}
                                                            sectionName={sectionName}
                                                            columnName={fieldFilterByPositions.fieldname}
                                                            text={field.label}
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


export default SectionColumn
