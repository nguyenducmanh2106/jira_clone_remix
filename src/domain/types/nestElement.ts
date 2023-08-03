import { FieldDto } from "@/src/api"

export type nestElementType = FieldDto & {
    components?: nestElementType[]
}