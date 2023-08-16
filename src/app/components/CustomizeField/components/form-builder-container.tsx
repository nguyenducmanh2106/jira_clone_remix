import { FieldDto } from '@/src/api'
import { FIELD_TYPE } from '@/src/constants'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import { nestElementType } from '@domain/types/nestElement'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { BeforeCapture, DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, DropResult, Droppable, DroppableProvided, Position, ResponderProvided, SensorAPI } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import FormSection from './form-section-container'
import { useDispatch } from 'react-redux'
import { moveItem } from '@app/store/Slice/fieldSectionSlice'
import { ItemTypes } from '@app/components/testm/ItemTypes'
import bindEvents from './form-section-container/bind-event'

export interface DragItem {
    type: string
}

export interface FormBuilderProps {
    onDrop: (item: any) => void
    lastDroppedColor?: string,
}

const FormBuilderContainer: FC<FormBuilderProps> = memo(function FormBuilder() {

    const dispatch = useDispatch()
    const { fields, nestElement } = useSelector((state) => state.fieldSection)

    // console.log(nestElement)
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

    const clientSelectionRef = useRef<Position>({ x: 0, y: 0 });
    console.log(clientSelectionRef)
    useEffect(() => {
        const unsubscribe = bindEvents(window, [
            {
                eventName: 'mousemove',
                fn: (event: MouseEvent) => {
                    const current: Position = {
                        x: event.clientX,
                        y: event.clientY,
                    };
                    clientSelectionRef.current = current;
                },
                options: { passive: true },
            },
        ]);
        return unsubscribe;
    });
    function onBeforeCapture(before: BeforeCapture) {
        window.dispatchEvent(
            new CustomEvent('onBeforeCapture', {
                detail: { before, clientSelection: clientSelectionRef.current },
            }),
        );
    }
    // const sensorAPIRef = useRef<SensorAPI>(null);
    // const api: SensorAPI = sensorAPIRef.current;

    // if (!api) {
    //     console.warn('unable to find sensor api');
    //     return null;
    // }
    return (
        <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}
            sensors={[
                (api) => {
                    // sensorAPIRef.current = api;
                    // console.log(api)
                },
            ]}
        >
            <Tabs defaultValue={nestElement?.components[0]?.fieldname ?? "custom_tab_break"} className="w-full">
                <div className='w-full'>
                    <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                        <Droppable
                            droppableId={'tab'}
                            type={ItemTypes.TAB}
                            direction="horizontal"
                            ignoreContainerClipping={true}
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
                                isCombineEnabled={false}
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

export default FormBuilderContainer