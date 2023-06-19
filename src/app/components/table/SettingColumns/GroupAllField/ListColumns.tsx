import type { FC } from 'react'
import { memo, useEffect, useState } from 'react'
import { Columns } from './Columns'
import { ColDef, ColGroupDef } from 'ag-grid-community'

export interface Column {
    columns: (ColDef | ColGroupDef)[] | undefined
}
export const GroupAllField: FC<Column> = memo(function Card({ columns }: Column) {

    return (
        <div className='group-all-field'>
            <Columns columns={columns} />
        </div>

    )

})