import React, { useEffect, useMemo, useState } from 'react';


import { ColDef, IStatusPanelParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@app/components/ui/dropdown-menu';
import { Button } from '@app/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@app/components/ui/command';
import { Calculator, Calendar, Settings, User } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@app/components/ui/popover';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/src/lib/utils';
import { Checkbox } from '@app/components/ui/checkbox';
import { GroupAllField } from '../SettingColumns/GroupAllField/ListColumns';
import { ListColumnDrag } from '../SettingColumns/GroupSelectedField/ListColumDrag';
// import { SelectContent, SelectItemIndicator, SelectTrigger } from '@radix-ui/react-select';

export interface CustomColumnProps {
    columns: ColDef[]
}
export const CustomColumn = ({ columns, ...props }: CustomColumnProps): JSX.Element => {

    const [open, setOpen] = React.useState(false)
    const [selectedPreset, setSelectedPreset] = React.useState<ColDef>()

    const columnsComputed: ColDef[] = useMemo(() => columns, [columns])

    const [isChange, setIsChange] = useState<boolean>(false)
    const [allColumns, setAllColumns] = useState<ColDef[]>(columns)
    const [columnDisplayings, setColumnDisplayings] = useState<ColDef[]>(() => {
        return columns?.filter((column: ColDef) => (column.headerName as string) && (!column.hide)) as ColDef[];
    })
    const toggleDisplayColumns = (column: ColDef) => {
        // props.columnApi.applyColumnState({
        //   state: [
        //     { colId: 'title', hide: true },
        //   ],
        // })
        const indexColumn = columnDisplayings.findIndex(columnItem => columnItem.colId === column.colId);
        const endIndex = columnDisplayings.length;
        const result = Array.from(columnDisplayings);
        const resultAllColumns = Array.from(allColumns);

        if (!column.hide) {
            result.splice(endIndex, 0, column);
            console.log("hiển thị")
        }
        else {
            const [removed] = result.splice(indexColumn, 1);

            // result.splice(endIndex, 0, removed);
            console.log("bị ẩn")
            setIsChange(true)
        }
        const indexColumnInAllColumn = resultAllColumns.findIndex(columnItem => columnItem.colId === column.colId);
        resultAllColumns.splice(indexColumnInAllColumn, 1, column);
        setAllColumns(resultAllColumns)
        setColumnDisplayings(result);
    }
    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-label="Load a preset..."
                    aria-expanded={open}
                    className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
                >
                    {/* {selectedPreset ? selectedPreset.headerName : "Load a preset..."} */}
                    Fields
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0 h-[500px]">
                {/* <Command>
                    <CommandInput placeholder="Search presets..."
                    />
                    <CommandEmpty>No presets found.</CommandEmpty>
                    <CommandGroup heading="Examples">
                        {columnsComputed.map((preset) => (
                            <CommandItem
                                key={preset.colId}
                                // onSelect={() => {
                                //     setSelectedPreset(preset)
                                //     setOpen(false)
                                // }}
                            >
                                <div className="flex items-center space-x-2">
                                    <Checkbox id={preset.colId} />
                                    <label
                                        htmlFor={preset.colId}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {preset.headerName}
                                    </label>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command> */}
                <div className={cn(
                    "grid grid-cols-2 gap-4 border-b overflow-y-auto my-[8px]",

                )} >
                    <GroupAllField columns={allColumns} toggleDisplayColumns={toggleDisplayColumns} isChange={isChange} />
                    <ListColumnDrag columns={columnDisplayings} toggleDisplayColumns={toggleDisplayColumns} />
                </div>
            </PopoverContent>
        </Popover>
    );
};
