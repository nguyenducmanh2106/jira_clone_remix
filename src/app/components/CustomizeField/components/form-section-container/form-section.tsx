import { Button } from "@app/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@app/components/ui/dialog"

export function FormSection() {
    return (
        <div className="form-section-container">
            <div className="form-section">
                <div className="section-header">
                    <div className="section-label">
                        <div title="Double click to edit label">
                            <span data-v-a015357f="">Employee Details</span>
                        </div>
                    </div>
                    <div className="section-actions">
                        <button data-v-080adc2e="" className="btn btn-xs btn-section" title="Move the current section and the following sections to a new tab">
                            <div data-v-080adc2e="">
                                <svg className="icon  icon-sm">
                                    <use className="" href="#icon-move"></use>
                                </svg>
                            </div>
                        </button>
                        <button data-v-080adc2e="" className="btn btn-xs btn-section" title="Add section above">
                            <div data-v-080adc2e="">
                                <svg className="icon  icon-sm" >
                                    <use className="" href="#icon-add"></use>
                                </svg>
                            </div>
                        </button>
                        <button data-v-080adc2e="" className="btn btn-xs btn-section" title="Remove section"><div data-v-080adc2e="">
                            <svg className="icon  icon-sm" >
                                <use className="" href="#icon-remove"></use>
                            </svg>
                        </div>
                        </button></div>
                </div>
                <div className="section-columns"></div>
            </div>
        </div>
    )
}