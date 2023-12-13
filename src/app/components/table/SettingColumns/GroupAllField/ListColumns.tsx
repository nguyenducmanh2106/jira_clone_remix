import type { FC } from 'react'
import { memo, useEffect, useState } from 'react'
import { Columns } from './Columns'
import { ColDef, ColGroupDef } from 'ag-grid-community'
import { Input } from '@app/components/ui/input';

export interface Column {
    columns: ColDef[];
    toggleDisplayColumns: (column: ColDef) => void;
    isChange: boolean;
}
export const GroupAllField: FC<Column> = memo(function Card({ columns, toggleDisplayColumns, isChange }: Column) {

    const [keywordFilter, setKeywordFilter] = useState<string>('')
    const handleChange = (e: any) => {
        setKeywordFilter(e.target.value)
    }
    return (
        <div className='group-all-field'>
            <Input className='ml-[8px] mb-[8px] mt-[8px] max-h-[32px]' onChange={handleChange} />
            <div className='group-all-field__columns h-[400px] overflow-y-auto'>
                <Columns columns={columns} toggleDisplayColumns={toggleDisplayColumns} isChange={isChange} keywordFilter={keywordFilter} />
            </div>
        </div>

    )

})