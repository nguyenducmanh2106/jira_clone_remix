import React, { forwardRef, useImperativeHandle } from 'react';
import { ICellRendererParams } from 'ag-grid-community';

type cellRendererComponentParameters = ICellRendererParams & {
    inputType: string,
    checkbox: boolean
}
export const CellComponentTableView = (props: cellRendererComponentParameters): JSX.Element => {
    // console.log(props)

    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const isCheckboxCell = props.checkbox;
    return (
        <span className="total-value-renderer">
            {isCheckboxCell ? (<></>) : (<span>{cellValue}</span>)}
        </span>
    );
};