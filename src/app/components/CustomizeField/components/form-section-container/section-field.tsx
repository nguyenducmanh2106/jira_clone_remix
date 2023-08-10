import { CopyIcon, Cross2Icon, MoveIcon, PlusIcon } from "@radix-ui/react-icons"
import React, { useRef, useState } from "react"
import { cx } from "class-variance-authority"
import { FieldDto } from "@/src/api"
import { useDrag, useDrop } from "react-dnd"
import { ItemTypes } from "@app/components/testm/ItemTypes"

import { useDispatch } from "react-redux"
import { moveItem } from "@app/store/Slice/fieldSectionSlice"
import { DraggableProvided } from "react-beautiful-dnd"
// import { moveItem } from "@app/store/Slice/fieldSectionSlice"
export interface SectionFieldProps {
    fields: FieldDto,
    isDragging: boolean,
    provided: DraggableProvided,
    isClone?: boolean,
    isGroupedOver?: boolean,
}
function SectionField({ id, text, fieldIndex, tabName, sectionName, columnName, tabIndex, sectionIndex, columnIndex, isDragging,
    isGroupedOver,
    provided, isClone }) {

    // console.log({ id, text, fieldIndex, tabName, sectionName, columnName, tabIndex, sectionIndex, columnIndex })
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const dispatch = useDispatch()


    // const [{ isDragging }, dragRef] = useDrag({
    //     type: ItemTypes.FIELD,
    //     item: { id, fieldIndex, a: "a", tabName, sectionName, columnName, tabIndex, sectionIndex, columnIndex },
    //     collect: (monitor) => ({
    //         isDragging: monitor.isDragging()
    //     }),
    //     end: (item, monitor) => {
    //         const didDrop = monitor.didDrop()
    //         if (!didDrop) {
    //             // console.log("didDrop")
    //             // const objMove = {
    //             //     fromTab: item.tabName,
    //             //     fromIndexTab: item.tabIndex,
    //             //     toTab: tabName,
    //             //     toIndexTab: tabIndex,
    //             //     fromSection: item.sectionName,
    //             //     fromIndexSection: item.sectionIndex,
    //             //     toSection: sectionName,
    //             //     toIndexSection: sectionIndex,
    //             //     fromColumn: item.columnName,
    //             //     fromIndexColumn: item.columnIndex,
    //             //     toColumn: columnName,
    //             //     toIndexColumn: columnIndex,
    //             //     fromIndexField: item.fieldIndex,
    //             //     toIndexField: fieldIndex,
    //             //     fieldDnD: ItemTypes.FIELD
    //             // }
    //             // dispatch(moveItem(objMove))
    //         }
    //     },
    // });

    // const [, dropRef] = useDrop({
    //     accept: ItemTypes.FIELD,
    //     hover: (item: FieldDto, monitor) => {
    //         if (item.id !== id) {
    //             console.log("hover drop")

    //             const objMove = {
    //                 fromTab: item.tabName,
    //                 fromIndexTab: item.tabIndex,
    //                 toTab: tabName,
    //                 toIndexTab: tabIndex,
    //                 fromSection: item.sectionName,
    //                 fromIndexSection: item.sectionIndex,
    //                 toSection: sectionName,
    //                 toIndexSection: sectionIndex,
    //                 fromColumn: item.columnName,
    //                 fromIndexColumn: item.columnIndex,
    //                 toColumn: columnName,
    //                 toIndexColumn: columnIndex,
    //                 fromIndexField: item.fieldIndex,
    //                 toIndexField: fieldIndex,
    //                 fieldDnD: ItemTypes.FIELD
    //             }
    //             dispatch(moveItem(objMove))
    //             item.fieldIndex = fieldIndex;
    //             item.tabName = tabName;
    //             item.tabIndex = tabIndex;
    //             item.sectionName = sectionName;
    //             item.sectionIndex = sectionIndex;
    //             item.columnName = columnName;
    //             item.columnIndex = columnIndex;
    //         }
    //         // return undefined;
    //     },
    // });

    const opacity = isDragging ? 1 : 1;
    return (
        <div
            ref={provided?.innerRef}
            // ref={(node) => dragRef(dropRef(node))}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            className={cx("field", "mt-[0.4rem]", isHovered ? "hovered" : "")}
            title="boarding_begins_on"
            style={{ opacity, transform: 'scale(1)', transition: 'transform 0.2s', border: "1px dashed #c0c6cc" }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-is-dragging={isDragging}
        >
            <div
                className="control frappe-control editable"
                data-fieldname="boarding_begins_on"
                data-fieldtype="Date"
            >
                <div className="field-controls">
                    <div className="field-label">
                        <div
                            title="Double click to edit label"
                        >
                            <span>{text}</span>
                            <span className="hidden-span">
                                Onboarding Begins On
                            </span>
                            <span className="hidden-span">
                                Label
                            </span>
                        </div>
                        <div className="reqd-asterisk">
                            *
                        </div>
                    </div>
                    <div className="field-actions">
                        {isHovered ? <>
                            <button className="btn btn-xs btn-icon">
                                <CopyIcon />
                            </button>
                            <button className="btn btn-xs btn-icon">
                                <Cross2Icon />
                            </button>
                        </> : <></>}
                    </div>
                </div>
                <input
                    className="w-full h-[32px]"
                    type="text"
                    placeholder=""
                    readOnly
                />
                <div className="selected-color no-value" />
            </div>
        </div>

    )
}

export default React.memo(SectionField);