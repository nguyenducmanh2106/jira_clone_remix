import { Button } from "@app/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog"
import { CopyIcon, Cross2Icon, MoveIcon, PlusIcon } from "@radix-ui/react-icons"
import { SectionColumn } from "./section-column"
import { useRef, useState } from "react"
import { cx } from "class-variance-authority"
import { FieldDto } from "@/src/api"
import { useDrag, useDrop } from "react-dnd"
import { ItemTypes } from "@app/components/testm/ItemTypes"

import { useSelector, useDispatch } from "react-redux"
import { increment } from "@app/store/Slice/counterSlice"
export interface SectionFieldProps {
    fields: FieldDto
}
export function SectionField({ id, text, index, listId, moveItem }) {
    const count = useSelector(state => state.counter)
    const dispatch = useDispatch()

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleFocus = () => {
        setIsFocus(true);
        dispatch(increment())
    };

    const [, dragRef] = useDrag({
        type: ItemTypes.ITEM,
        item: { id, index, listId },
    });

    const [, dropRef] = useDrop({
        accept: ItemTypes.ITEM,
        hover: (item) => {
            if (item.id !== id) {
                moveItem(item.listId, item.index, listId, index);
                item.index = index;
                item.listId = listId;
            }
        },
    });
    return (
        <div
            ref={(node) => dragRef(dropRef(node))}
            onClick={handleFocus}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cx("field", isHovered ? "hovered" : "")}
            title="boarding_begins_on"
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
                            <span>{text} {count}</span>
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