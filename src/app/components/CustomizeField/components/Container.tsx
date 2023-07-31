import type { FC } from 'react'
import { memo } from 'react'
import { FormBuilderContainer } from './form-builder-container'
import { PresetSelector } from './preset-selector'
import { presets } from '../data/presets'
import { PresetSave } from './preset-save'
import { CodeViewer } from './code-viewer'
import { PresetShare } from './preset-share'
import { PresetActions } from './preset-actions'
import { Separator } from '@app/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import { Input } from '@app/components/ui/input'
import { Field } from './field'
import { Textarea } from '@app/components/ui/textarea'
import { Button } from '@app/components/ui/button'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import cx from 'classix'


export const Container: FC = memo(function Container() {
    const fields = ["Autocomplete", "Attach", "Attach Image", "Button", "Textarea"]

    return (
        <div className="hidden h-full flex-col md:flex">
            <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                <h2 className="text-lg font-semibold">Playground</h2>
                <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                    <PresetSelector presets={presets} />
                    <PresetSave />
                    <div className="hidden space-x-2 md:flex">
                        <CodeViewer />
                        <PresetShare />
                    </div>
                    <PresetActions />
                </div>
            </div>
            <Separator />
            <Tabs defaultValue="complete" className="flex-1">
                <div className="container h-full py-6">
                    <div className="grid h-full items-stretch gap-6 md:grid-cols-[280px_1fr]">
                        <div className="hidden flex-col space-y-4 sm:flex md:order-1">
                            <div className="grid gap-2">
                                <TabsList className="grid grid-cols-2">
                                    <TabsTrigger value="complete">
                                        Field Types
                                    </TabsTrigger>
                                    <TabsTrigger value="insert">
                                        Field Properties
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                            {/* <ModelSelector types={types} models={models} /> */}
                            <Input placeholder="Search fields" className={cx(
                                "border-1 box-border h-[36px] rounded border-none bg-grey-100 py-2",
                                "pr-8 pl-2 outline outline-2 outline-grey-400 duration-200 ease-in-out",
                                "placeholder:font-primary-light placeholder:text-xs placeholder:text-font-light",
                                "placeholder:duration-200 placeholder:ease-in-out hover:bg-grey-300",
                                "focus:bg-white focus:shadow-blue focus:outline-primary-main dark:bg-dark-500",
                                "dark:outline-dark-100 dark:placeholder:text-font-main-dark dark:placeholder:opacity-50",
                                "dark:placeholder:text-opacity-100 dark:focus:outline-primary-main-dark"
                            )} />
                            <Separator className="my-4" />
                            <div className="md:order-2">
                                <TabsContent value="complete" className="mt-0 border-0 p-0">
                                    <div className="flex h-full flex-col space-y-4">
                                        <div className="fields-container grid grid-cols-2 auto-rows-max p-[8px] gap-[8px] overflow-y-auto">
                                            {fields.map(field =>
                                                <Field key={field} label={field} />
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="insert" className="mt-0 border-0 p-0">
                                    <div className="flex flex-col space-y-4">
                                        <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                                            <Textarea
                                                placeholder="We're writing to [inset]. Congrats from OpenAI!"
                                                className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                                            />
                                            <div className="rounded-md border bg-muted"></div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button>Submit</Button>
                                            <Button variant="secondary">
                                                <span className="sr-only">Show history</span>
                                                <CounterClockwiseClockIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>
                            </div>
                        </div>
                        <div className="md:order-2">
                            <div className="mt-0 border-[1px] p-0">
                                <div className="flex h-full flex-col space-y-4 min-h-[700px]">
                                    <FormBuilderContainer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    )
})
