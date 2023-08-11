import { FieldDto } from '@/src/api'
import { FIELD_TYPE } from '@/src/constants'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import { nestElementType } from '@domain/types/nestElement'
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, DropResult, Droppable, DroppableProvided, ResponderProvided } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import FormSection from './form-section-container'
import { useDispatch } from 'react-redux'
import { moveItem } from '@app/store/Slice/fieldSectionSlice'
import { ItemTypes } from '@app/components/testm/ItemTypes'

export interface DragItem {
    type: string
}

export interface FormBuilderProps {
    onDrop: (item: any) => void
    lastDroppedColor?: string,
}

const FormBuilder: FC<FormBuilderProps> = memo(function FormBuilder({
    onDrop,
    lastDroppedColor,
}) {
    // const [{ isOver, draggingColor, canDrop }, drop] = useDrop(
    //     () => ({
    //         accept: ["field"],
    //         drop(_item: DragItem, monitor) {
    //             onDrop(monitor.getItemType())
    //             return undefined
    //         },
    //         collect: (monitor: DropTargetMonitor) => ({
    //             isOver: monitor.isOver(),
    //             canDrop: monitor.canDrop(),
    //             draggingColor: monitor.getItemType() as string,
    //         }),
    //     }),
    //     [onDrop],
    // )
    const dispatch = useDispatch()
    const { fields, nestElement } = useSelector((state) => state.fieldSection)

    console.log(nestElement)
    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {

        //kéo không có sự thay đổi
        if (!result.destination) return
        // console.log(result)

        const { destination, source, type } = result;
        const { droppableId: destinationId, index: destinationIndex } = destination;
        const { droppableId: sourceId, index: sourceIndex } = source;
        const [...destinationPosition] = destinationId.split(':')
        const [...sourcePosition] = sourceId.split(':')
        //nếu có sự thay đổi thì làm gì
        const objMove = {
            fromIndexTab: +sourcePosition[0],
            toIndexTab: +destinationPosition[0],
            fromIndexSection: +sourcePosition[1],
            toIndexSection: +destinationPosition[1],
            fromIndexColumn: +sourcePosition[2],
            toIndexColumn: +destinationPosition[2],
            fromIndexField: sourceIndex,
            toIndexField: destinationIndex,
            fieldDnD: type
        }
        dispatch(moveItem(objMove))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Tabs defaultValue={nestElement?.components[0]?.fieldname ?? "custom_tab_break"} className="w-full">
                <div className='w-full'>
                    <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                        <Droppable
                            droppableId={'tab'}
                            type={ItemTypes.TAB}
                            direction="horizontal"
                            ignoreContainerClipping={false}
                            isCombineEnabled={true}
                        >
                            {(provided: DroppableProvided) => (
                                <div className="form-builder-container" ref={provided.innerRef} {...provided.droppableProps}>
                                    {nestElement?.components.map((field: FieldDto, tabIndex: number) => {
                                        if (field.fieldtype === FIELD_TYPE.TAB_BREAK) {
                                            return (
                                                <Draggable key={field.fieldname} draggableId={field.fieldname as string} index={tabIndex as number}>
                                                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                                        <TabsTrigger
                                                            ref={provided.innerRef} {...provided.draggableProps}  {...provided.dragHandleProps}
                                                            value={field.fieldname as string}>{field.label}</TabsTrigger>

                                                    )}
                                                </Draggable>
                                            )
                                        }
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                    </TabsList>
                </div>
                {nestElement?.components.map((fieldTab: nestElementType, positionTab: number) => {
                    return (
                        <TabsContent key={fieldTab.fieldname} value={fieldTab.fieldname as string}>
                            <Droppable
                                droppableId={`${positionTab}:${fieldTab.fieldname}`}
                                type={ItemTypes.SECTION}
                                direction="vertical"
                                ignoreContainerClipping={true}
                                isCombineEnabled={true}
                            >
                                {(provided: DroppableProvided) => (
                                    <div className="tab-columns-container" ref={provided.innerRef} {...provided.droppableProps}>
                                        {fieldTab?.components?.map((field: nestElementType, positionSection: number) => {
                                            return (
                                                <FormSection
                                                    key={field.fieldname}
                                                    label={field.label as string}
                                                    fieldFormSection={field}
                                                    tabName={fieldTab.fieldname as string}
                                                    tabIndex={positionTab}
                                                    sectionIndex={positionSection}
                                                />
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            {/* {fieldTab?.components?.map((field: nestElementType, positionSection: number) => {
                            return (
                                <FormSection
                                    key={field.fieldname}
                                    label={field.label as string}
                                    fieldFormSection={field}
                                    tabName={fieldTab.fieldname as string}
                                    tabIndex={positionTab}
                                    sectionIndex={positionSection}
                                />
                            )
                        })} */}
                        </TabsContent>
                    )
                })}
            </Tabs>
        </DragDropContext>
    )
})

export interface FormBuilderContainerState {
    tablist: any
}
export const FormBuilderContainer = (props) => {
    const [lastDroppedColor, setLastDroppedColor] = useState<string | null>(null)
    const handleDrop = useCallback(
        (color: string) => setLastDroppedColor(color),
        [],
    )

    return (
        <FormBuilder
            {...props}
            lastDroppedColor={lastDroppedColor as string}
            onDrop={handleDrop}
        />
    )
}
