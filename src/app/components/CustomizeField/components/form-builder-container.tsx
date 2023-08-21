import { FieldDto } from '@/src/api'
import { FIELD_TYPE } from '@/src/constants'
import { ItemTypes } from '@app/components/testm/ItemTypes'
import { Button } from '@app/components/ui/button'
import { Card, CardContent } from '@app/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import { addSection } from '@app/store/Slice/fieldSectionSlice'
import { nestElementType } from '@domain/types/nestElement'
import type { FC } from 'react'
import { memo } from 'react'
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import FormSection from './form-section-container'

export interface DragItem {
    type: string
}

export interface FormBuilderProps {
    lastDroppedColor?: string,
}

const FormBuilderContainer: FC<FormBuilderProps> = memo(function FormBuilder() {

    const dispatch = useDispatch()
    const { nestElement } = useSelector((state) => state.fieldSection)



    const handleAddSection = (tabIndex: number, sectionIndex: number) => {
        dispatch(addSection({
            currentTabIndex: tabIndex,
            aboveSectionIndex: sectionIndex
        }))
    };

    return (
        <>
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
                                        {fieldTab?.components && fieldTab?.components?.length > 0 ? fieldTab?.components?.map((field: nestElementType, positionSection: number) => {
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
                                        }) : <Card>

                                            <CardContent>
                                                <div className='flex h-[110px] w-full justify-center items-center'>
                                                    <Button onClick={() => handleAddSection(positionTab, 0)}>Add new section</Button>
                                                </div>
                                            </CardContent>

                                        </Card>}
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
        </>
    )
})

export default FormBuilderContainer