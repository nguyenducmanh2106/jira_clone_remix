import React, { useEffect, useMemo, useState } from 'react';


import { ColDef, IStatusPanelParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@app/components/ui/dropdown-menu';
import { Button } from '@app/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@app/components/ui/command';
import { Calculator, Calendar, ColumnsIcon, Settings, User } from 'lucide-react';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@app/components/ui/popover';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/src/lib/utils';
import { Checkbox } from '@app/components/ui/checkbox';
import { GroupAllField } from '../SettingColumns/GroupAllField/ListColumns';
import { ListColumnDrag } from '../SettingColumns/GroupSelectedField/ListColumDrag';
import { Label } from '@app/components/ui/label';
import { Input } from '@app/components/ui/input';
// import { SelectContent, SelectItemIndicator, SelectTrigger } from '@radix-ui/react-select';

export interface FilterProps {
    columns: ColDef[]
}
export const FilterComponent = ({ columns, ...props }: FilterProps): JSX.Element => {

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
                    variant="ghost"
                    role="combobox"
                    aria-label="Load a preset..."
                    aria-expanded={open}
                    className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
                >
                    <ColumnsIcon className="mr-2 h-4 w-4 shrink-0" />
                    Filters
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                            Set the dimensions for the layer.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Width</Label>
                            <Input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxWidth">Max. width</Label>
                            <Input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="height">Height</Label>
                            <Input
                                id="height"
                                defaultValue="25px"
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxHeight">Max. height</Label>
                            <Input
                                id="maxHeight"
                                defaultValue="none"
                                className="col-span-2 h-8"
                            />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
