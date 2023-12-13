import { CopyIcon, Cross2Icon } from "@radix-ui/react-icons"
import { cx } from "class-variance-authority"
import { useRef, useState } from "react"

import { removeField } from "@app/store/Slice/fieldSectionSlice"
import { DraggableProvided } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
// import { moveItem } from "@app/store/Slice/fieldSectionSlice"
export interface SectionFieldProps {
    id: string,
    text: string,
    fieldIndex: number,
    tabIndex: number,
    columnIndex: number,
    sectionIndex: number,
    tabName: string,
    columnName: string,
    sectionName: string,
    isDragging: boolean,
    provided: DraggableProvided,
    isClone?: boolean,
    isGroupedOver?: boolean,
    className?: string,
}
function SectionField({ className, id, text, fieldIndex, tabName, sectionName, columnName, tabIndex, sectionIndex, columnIndex, isDragging,
    isGroupedOver,
    provided, isClone }: SectionFieldProps) {
    const ref = useRef<HTMLElement>(null);

    const dispatch = useDispatch()
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const opacity = isDragging ? 0.7 : 1;

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        ...draggableStyle,
        borderColor: isDragging || isHovered ? '#2490ef' : 'inherit',
        opacity
    });

    const handleRemoveField = (fieldIndex: number) => {
        const payload = {
            currentTabIndex: tabIndex,
            currentSectionIndex: sectionIndex,
            currentColumnIndex: columnIndex,
            fieldIndex,
        }
        dispatch(removeField(payload))
    }
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
                className={cx("field", "mt-[0.4rem]", className, isHovered ? "hovered" : "")}
                title={text}
                {...provided.draggableProps}
                // role="abc"
                {...provided.dragHandleProps}
                style={getItemStyle(isDragging, provided.draggableProps.style)}
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
                                <button className="btn btn-xs btn-icon"
                                    onClick={() => handleRemoveField(fieldIndex)}
                                >
                                    <Cross2Icon />
                                </button>
                            </> : <></>}
                        </div>
                    </div>
                    <input
                        className="w-full h-[32px] pointer-events-none"
                        type="text"
                        placeholder=""
                        readOnly
                    />
                    <div className="selected-color no-value" />
                </div>
            </div>
        </>

    )
}

export default SectionField;