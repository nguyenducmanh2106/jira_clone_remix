import { useState } from "react"

import { Button } from "@app/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@app/components/ui/form"
import { Input } from "@app/components/ui/input"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@app/components/ui/select"
import { Checkbox } from "@app/components/ui/checkbox"
import { Textarea } from "@app/components/ui/textarea"
export interface FieldPropertyProps {
    className?: string,
}
function FieldProperty({ className }: FieldPropertyProps) {

    const items = [
        {
            key: "unique",
            label: "Unique",
            value: false
        },
        {
            key: "is_virtual",
            label: "Is Virtual",
            value: false
        },
        {
            key: "in_list_view",
            label: "In List View",
            value: false
        },
        {
            key: "in_standard_filter",
            label: "In Standard Filter",
            value: false
        },
        {
            key: "in_preview",
            label: "In Preview",
            value: false
        },
        {
            key: "bold",
            label: "Bold",
            value: false
        },
        {
            key: "no_copy",
            label: "No Copy",
            value: false
        },
        {
            key: "allow_in_quick_entry",
            label: "Allow in Quick Entry",
            value: false
        },
    ] as const;
    const objMap = items.map((item) => ({ [item.key]: z.boolean().default(false).optional() }))
        .reduce((result, currentObject) => ({ ...result, ...currentObject }), {});

    const FormSchema = z.object({
        label: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        type: z
            .string({
                required_error: "Please select an email to display.",
            }),
        name: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        ...objMap,
        defaultValue: z
            .string()
            .min(10, {
                message: "Bio must be at least 10 characters.",
            })
            .max(160, {
                message: "Bio must not be longer than 30 characters.",
            }),
        length: z.number(),
        options: z.string(),
    })
    const dynamicSchema = z.record(z.boolean())
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            // items: ["recents", "home"],
            label: "manhnd",
            length: 0,
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(JSON.stringify(data, null, 2))
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-center gap-4">
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Column Break">Column Break</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {items.map((item) => (
                        <FormField
                            key={item.key}
                            control={form.control}
                            name={item.key}
                            render={({ field }) => {
                                return (
                                    <FormItem
                                        key={item.key}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {item.label}
                                        </FormLabel>
                                    </FormItem>
                                )
                            }}
                        />
                    ))}
                    <FormField
                        control={form.control}
                        name="defaultValue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Default</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder=""
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="length"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Length</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="options"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Option</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormDescription>
                                    For Links, enter the DocType as range. For Select, enter list of Options, each on a new line.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>

    )
}

export default FieldProperty;