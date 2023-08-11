import { FieldDto } from "@/src/api"

export type nestElementType = FieldDto & {
    components?: nestElementType[],
    tabIndex?: number,
    tabName?: string,
    sectionIndex?: number,
    sectionName?: string,
    columnIndex?: number,
    columnName?: string
}