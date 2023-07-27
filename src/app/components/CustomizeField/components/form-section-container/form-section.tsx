import { Button } from "@app/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog"
import { CopyIcon, Cross2Icon, MoveIcon, PlusIcon } from "@radix-ui/react-icons"
import { SectionColumn } from "./section-column"

export function FormSection() {
    return (
        <div className="form-section-container">
            <div className="form-section" title="details_section">
                <div className="section-header has-label">
                    <div className="section-label">
                        <div title="Double click to edit label">
                            <span data-v-a015357f="">Employee Details</span>
                        </div>
                    </div>
                    <div className="section-actions">
                        <button className="btn btn-xs btn-section" title="Move the current section and the following sections to a new tab">
                            <MoveIcon />
                        </button>
                        <button className="btn btn-xs btn-section" title="Add section above">
                            <PlusIcon />
                        </button>
                        <button className="btn btn-xs btn-section" title="Remove section">
                            <Cross2Icon />
                        </button>
                    </div>
                </div>
                <div className="section-columns">
                    <div className="section-columns-container">
                        <SectionColumn />
                        <SectionColumn />
                    </div>

                </div>
            </div>
        </div>
    )
}