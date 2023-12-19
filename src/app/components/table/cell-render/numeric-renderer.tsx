import { ICellRendererParams } from "ag-grid-community";
import { memo, useMemo } from "react";

const NumericRenderer = memo((props: ICellRendererParams | any) => {
    const value = props.value ?? 0;
    const textRender = currencyFormatter(value)
    function currencyFormatter(value: number) {
        // this puts commas into the number eg 1000 goes to 1,000,
        // i pulled this from stack overflow, i have no idea how it works
        if (!value) return "-"
        const formattedNumber = new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 8,
        }).format(value);
        return formattedNumber;
    }
    return <span>{textRender}</span>;
});

export default NumericRenderer;

