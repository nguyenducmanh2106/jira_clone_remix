import { CopyIcon, Cross2Icon, MoveIcon, PlusIcon } from "@radix-ui/react-icons"
import React, { useEffect, useRef, useState } from "react"
import { cx } from "class-variance-authority"
import { FieldDto } from "@/src/api"
import { useDrag, useDrop } from "react-dnd"
import { ItemTypes } from "@app/components/testm/ItemTypes"

import { useDispatch } from "react-redux"
import { moveItem } from "@app/store/Slice/fieldSectionSlice"
import { DraggableProvided } from "react-beautiful-dnd"
import bindEvents from "./bind-event"
// import { moveItem } from "@app/store/Slice/fieldSectionSlice"
export interface SectionFieldProps {
    fields: FieldDto,
    isDragging: boolean,
    provided: DraggableProvided,
    isClone?: boolean,
    isGroupedOver?: boolean,
    className?: string,
}
function SectionField({ className, id, text, fieldIndex, tabName, sectionName, columnName, tabIndex, sectionIndex, columnIndex, isDragging,
    isGroupedOver,
    provided, isClone }: any) {
    const ref = useRef<HTMLElement>(null);

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const opacity = isDragging ? 0 : 1;
    return (
        <>
            <div
                // ref={provided?.innerRef}
                ref={(node: HTMLElement) => {
                    provided.innerRef(node);
                    ref.current = node;
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cx("field", "mt-[0.4rem]", isDragging ? 'max-w-[200px]' : '', className, isHovered ? "hovered" : "")}
                title={text}
                style={{ border: "1px dashed #c0c6cc" }}
                {...provided.draggableProps}
                // role="abc"
                {...provided.dragHandleProps}
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
            {provided?.placeholder}
        </>

    )
}

export default React.memo(SectionField);