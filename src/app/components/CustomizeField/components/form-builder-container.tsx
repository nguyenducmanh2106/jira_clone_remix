import { Button } from '@app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@app/components/ui/card'
import { Input } from '@app/components/ui/input'
import { Label } from '@app/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import type { FC } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import type { DropTargetMonitor } from 'react-dnd'
import { DndProvider, useDrop } from 'react-dnd'
import cx from 'classix'
import FormSection from './form-section-container'
import ListContainer from '@app/components/testm/ListContainer'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'
import { FieldDto } from '@/src/api'
import { FIELD_TYPE } from '@/src/constants'
import { nestElementType } from '@domain/types/nestElement'
import { fieldSectionType } from '@app/store/Slice/fieldSectionSlice'
import { SectionTab } from './form-section-container/section-tab'

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
    const { fields, nestElement } = useSelector((state) => state.fieldSection)


    return (
        <Tabs defaultValue="custom_tab_break" className="w-full">
            <div className='w-full'>
                <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                    {nestElement?.components.map((field: FieldDto) => {
                        if (field.fieldtype === FIELD_TYPE.TAB_BREAK) {
                            return (
                                <TabsTrigger key={field.fieldname} value={field.fieldname as string}>{field.label}</TabsTrigger>
                            )
                        }
                    })}
                </TabsList>
            </div>
            {nestElement?.components.map((fieldTab: nestElementType, positionTab: number) => {
                return (
                    <TabsContent key={fieldTab.fieldname} value={fieldTab.fieldname as string}>
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
                    </TabsContent>
                )
            })}
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
