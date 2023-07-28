import { Button } from '@app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@app/components/ui/card'
import { Input } from '@app/components/ui/input'
import { Label } from '@app/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import type { DropTargetMonitor } from 'react-dnd'
import { DndProvider, useDrop } from 'react-dnd'
import { TabModel } from './types'
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
    const dispatch = useDispatch()
    console.log(fields)


    return (
        <Tabs defaultValue="details_tab" className="w-full">
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
            {fields.map((field: FieldDto) => {
                if (field.fieldtype === FIELD_TYPE.TAB_BREAK) {
                    return (
                        <TabsContent key={field.fieldname} value={field.fieldname as string}>
                            {fields.map((field: FieldDto) => {
                                if (field.fieldtype === FIELD_TYPE.SECTION_BREAK) {
                                    return (
                                        <FormSection
                                            key={field.fieldname}
                                            label={field.label as string}
                                        />
                                    )
                                }
                            })}
                        </TabsContent>
                    )
                }
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
    tablist: TabModel[]
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
