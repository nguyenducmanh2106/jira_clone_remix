import type { CSSProperties, FC } from 'react'
import { memo, useMemo, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { ColDef, ColGroupDef } from 'ag-grid-community'
import { Label } from '@app/components/ui/label'
import { Checkbox } from '@app/components/ui/checkbox'

const style: CSSProperties = {
    border: '1px solid transparent',
    padding: '0 8px 0 16px',
    // backgroundColor: '#f0f2f4',
    display: 'flex',
    alignItems: 'center',
    minHeight: '32px',
    maxHeight: '32px',
    opacity: 1,
    cursor: 'pointer',
}

export interface Column {
    columns: ColDef[];
    toggleDisplayColumns: (column: ColDef) => void;
    isChange: boolean;
    keywordFilter: string
}

export const Columns: FC<Column> = memo(function Card({ columns, toggleDisplayColumns, isChange, keywordFilter }: Column) {
    const ref = useRef(null)
    console.log(isChange)
    const containerStyle = useMemo(() => ({ ...style }), [])

    const handleCheck = (status: boolean, column: ColDef) => {
        const statusState = status;
        const columnState = {
            ...column,
            hide: !statusState
        }
        toggleDisplayColumns(columnState)
    }

    const columnFilter = columns.filter((column: ColDef<any>) => {
        return (column?.headerName ?? '').toLowerCase().includes(keywordFilter.toLowerCase())
    })

    return (
        <>
            {columnFilter?.map((column: ColDef, index) => {
                if (column.headerName) {
                    return (
                        <div className='hover:bg-[#f0f2f4]' key={column.colId || index} ref={ref} style={containerStyle}>
                            <div className="flex items-center space-x-2 h-[32px] w-full">
                                <Checkbox onCheckedChange={(e: boolean) => handleCheck(e, column)} checked={!column.hide} defaultChecked={!column.hide} id={`column-${column.colId}-${index}`} />
                                <Label className='flex-auto cursor-pointer' htmlFor={`column-${column.colId}-${index}`}>{column.headerName}</Label>
                            </div>
                        </div>
                    )
                }
            })}
        </>

    )

})
