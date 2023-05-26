import React, { forwardRef, useImperativeHandle } from 'react';
import { ICellRendererParams } from 'ag-grid-community';

/**
 * Kiểu dữ liệu truyền vào
 */
type cellRendererComponentParameters = ICellRendererParams & {
    inputType: string,
    checkbox: boolean
}

/**
 * Dùng để format cell trong ag-grid
 * @param props 
 * @returns 
 */
export const CellComponentTableView = (props: cellRendererComponentParameters): JSX.Element => {
    // console.log(props)
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const isCheckboxCell = props.checkbox;
    const inputType = props.inputType
    return (
        <span className="total-value-renderer">
            {isCheckboxCell ? (<></>) : inputType === 'number' ? <span>{formatter.format(cellValue)}</span> : (<span>{cellValue}</span>)}
        </span>
    );
};