import { Button } from '@app/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@app/components/ui/card'
import { Input } from '@app/components/ui/input'
import { Label } from '@app/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import type { DropTargetMonitor } from 'react-dnd'
import { useDrop } from 'react-dnd'
import { TabModel } from './types'
import cx from 'classix'
import FormSection from './form-section-container'

export interface DragItem {
    type: string
}

export interface FormBuilderProps {
    onDrop: (item: any) => void
    lastDroppedColor?: string,
    tablist: TabModel[]
}

const FormBuilder: FC<FormBuilderProps> = memo(function FormBuilder({
    onDrop,
    tablist,
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


    return (
        <Tabs defaultValue="account" className="w-full">
            <div className='w-full'>
                <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                    {tablist.map((tab: TabModel) =>
                        <TabsTrigger key={tab.key} value="account">{tab.label}</TabsTrigger>
                    )}
                </TabsList>
            </div>
            <TabsContent value="account">
                <FormSection />
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Current password</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">New password</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save password</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
        // <div
        //     ref={drop}
        //     data-color={lastDroppedColor || 'none'}
        //     style={{ ...style, backgroundColor, opacity }}
        //     role="TargetBox"
        // >
        //     <p>Drop here.</p>

        //     {!canDrop && lastDroppedColor && <p>Last dropped: {lastDroppedColor}</p>}
        // </div>
    )
})

export interface FormBuilderContainerState {
    // lastDroppedColor: string | null,
    tablist: TabModel[]
}
export const FormBuilderContainer = (props: FormBuilderContainerState) => {
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
            tablist={props.tablist}
        />
    )
}
