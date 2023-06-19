import type { CSSProperties, FC } from 'react'
import { memo, useMemo, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { Checkbox } from '@app/components/Checkbox'
import { ColDef, ColGroupDef } from 'ag-grid-community'

const style: CSSProperties = {
    border: '1px solid transparent',
    // padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: '#f0f2f4',
    display: 'flex',
    alignItems: 'center',
    minHeight: '36px',
    maxHeight: '36px',
    opacity: 1,
    cursor: 'pointer',
}

export interface Column {
    columns: (ColDef | ColGroupDef)[] | undefined
}

export const Columns: FC<Column> = memo(function Card({ columns }: Column) {
    const ref = useRef(null)

    const containerStyle = useMemo(() => ({ ...style }), [])

    return (
        <>
            {columns?.map((column: ColDef | ColGroupDef, index) => {
                if (column.headerName) {
                    return (
                        <div key={index} ref={ref} style={containerStyle}
                        >
                            <Checkbox />
                            {/* <div className='cursor-move mx-[4px]'>
                        <div className='dragable-icon'></div>
                    </div> */}
                            <div className='pointer-events-none'>{column.headerName}</div>
                        </div>
                    )
                }
            })}
        </>

    )

})
