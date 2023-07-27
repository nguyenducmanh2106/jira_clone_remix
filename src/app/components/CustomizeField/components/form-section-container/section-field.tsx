import { Button } from "@app/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog"
import { CopyIcon, Cross2Icon, MoveIcon, PlusIcon } from "@radix-ui/react-icons"
import { SectionColumn } from "./section-column"
import { useRef, useState } from "react"
import { cx } from "class-variance-authority"
import { FieldDto } from "@/src/api"

export interface SectionFieldProps {
    fields: FieldDto
}
export function SectionField() {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const divRefs = useRef(null);

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleFocus = () => {
        setIsFocus(true);
        console.log(divRefs.current)
    };
    return (
        <div
            ref={divRefs}
            onClick={handleFocus}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cx("field", isHovered ? "hovered" : "")}
            title="boarding_begins_on"
            data-is-user-generated={0}
            data-draggable="true"
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
                            <span data-v-a015357f="">Onboarding Begins On</span>
                            <span data-v-a015357f="" className="hidden-span">
                                Onboarding Begins On
                            </span>
                            <span data-v-a015357f="" className="hidden-span">
                                Label
                            </span>
                        </div>
                        <div data-v-43f9e43e="" className="reqd-asterisk">
                            *
                        </div>
                    </div>
                    <div className="field-actions">
                        {isHovered ? <>
                            <button data-v-43f9e43e="" className="btn btn-xs btn-icon">
                                <CopyIcon />
                            </button>
                            <button data-v-43f9e43e="" className="btn btn-xs btn-icon">
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