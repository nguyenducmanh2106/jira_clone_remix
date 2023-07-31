import { Button } from '@app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@app/components/ui/card'
import { Input } from '@app/components/ui/input'
import { Label } from '@app/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import type { DropTargetMonitor } from 'react-dnd'
import { DndProvider, useDrop } from 'react-dnd'
import cx from 'classix'
import FormSection from './form-section-container'
import ListContainer from '@app/components/testm/ListContainer'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'
import { FieldDto } from '@/src/api'
import { FIELD_TYPE } from '@/src/constants'

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
    const [{ isOver, draggingColor, canDrop }, drop] = useDrop(
        () => ({
            accept: ["field"],
            drop(_item: DragItem, monitor) {
                onDrop(monitor.getItemType())
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
    const { fields } = useSelector(state => state.fieldSection)

    const fieldTabs = fields.filter((field: FieldDto) => field.fieldtype === FIELD_TYPE.TAB_BREAK)
    const fieldFormSections = fields.filter((field: FieldDto) => field.fieldtype === FIELD_TYPE.SECTION_BREAK)

    return (
        <Tabs defaultValue="custom_tab_break" className="w-full">
            <div className='w-full'>
                <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                    {fields.map((field: FieldDto) => {
                        if (field.fieldtype === FIELD_TYPE.TAB_BREAK) {
                            return (
                                <TabsTrigger key={field.fieldname} value={field.fieldname as string}>{field.label}</TabsTrigger>
                            )
                        }
                    })}
                </TabsList>
            </div>
            {fieldTabs.map((fieldTab: FieldDto, positionTab: number) => {
                let positionFormSection = 0;
                const positionTabInList = fields.findIndex((item: FieldDto) => item.fieldname === fieldTab.fieldname);
                return (
                    <TabsContent key={fieldTab.fieldname} value={fieldTab.fieldname as string}>
                        {fieldFormSections.map((field: FieldDto) => {
                            const positionFormSectionInList = fields.findIndex((item: FieldDto) => item.fieldname === field.fieldname);
                            if (positionTabInList < positionFormSectionInList) {
                                positionFormSection++;
                                console.log(positionTabInList,positionFormSectionInList)
                                return (
                                    <FormSection
                                        key={field.fieldname}
                                        label={field.label as string}
                                        positionTab={positionTab}
                                        positionFormSection={positionFormSection - 1}
                                    />
                                )
                            }
                        })}
                    </TabsContent>
                )
            })}

            {/* <TabsContent value="AddNewTab1">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you will be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1 }}>
                                <h3>List A</h3>
                                {listA.map((item, index) => (
                                    <ListContainer key={item.id} id={item.id} text={item.text} index={index} listId="listA" moveItem={moveItem} />
                                ))}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3>List B</h3>
                                {listB.map((item, index) => (
                                    <ListContainer key={item.id} id={item.id} text={item.text} index={index} listId="listB" moveItem={moveItem} />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent> */}
        </Tabs>
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
