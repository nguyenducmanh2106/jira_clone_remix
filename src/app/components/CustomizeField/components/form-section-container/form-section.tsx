import { FieldDto } from "@/src/api";
import { ItemTypes } from "@app/components/testm/ItemTypes";
import { nestElementType } from "@domain/types/nestElement";
import { Cross2Icon, MoveIcon, PlusIcon } from "@radix-ui/react-icons";
import cx from "classix";
import { useMemo, useState } from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot, DropResult, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import SectionColumn from "./section-column";
import { addSection, removeSection } from "@app/store/Slice/fieldSectionSlice";
export type FormSectionProps = {
    label: string,
    tabName: string,
    fieldFormSection: nestElementType,
    tabIndex: number,
    sectionIndex: number,
}
export function FormSection(props: FormSectionProps) {

    const { label, fieldFormSection, tabName, tabIndex, sectionIndex } = props;
    const dispatch = useDispatch()
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const fieldFilterByPositions: nestElementType = useMemo(() => {
        const cloneFields: nestElementType = { ...fieldFormSection };
        return cloneFields;

    }, [fieldFormSection])

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleAddSection = (sectionIndex: number) => {
        dispatch(addSection({
            currentTabIndex: tabIndex,
            aboveSectionIndex: sectionIndex
        }))
    };

    const handleRemoveSection = (sectionIndex: number) => {
        dispatch(removeSection({
            currentTabIndex: tabIndex,
            aboveSectionIndex: sectionIndex
        }))
    };

    const onDragEnd = (result: DropResult) => {
        console.log(result)
    }
    return (
        <Draggable
            draggableId={`${tabIndex}:${fieldFilterByPositions.fieldname}`}
            index={sectionIndex as number}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <div className="form-section-container"
                    ref={provided.innerRef}
                    {...provided.draggableProps}

                >
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={cx("form-section", isHovered || snapshot.isDragging ? "hovered" : "")}
                        title="details_section">
                        <div className="section-header has-label">
                            <div className="section-label">
                                <div title="Double click to edit label">
                                    <span data-v-a015357f="">{label}</span>
                                </div>
                            </div>
                            <div className="section-actions">
                                <button className="btn btn-xs btn-section"  {...provided.dragHandleProps}
                                    title="Move the current section and the following sections to a new tab">
                                    <MoveIcon />
                                </button>
                                <button className="btn btn-xs btn-section" title="Add section above"
                                    onClick={() => handleAddSection(sectionIndex)}
                                >
                                    <PlusIcon />
                                </button>
                                <button className="btn btn-xs btn-section" title="Remove section"
                                    onClick={() => handleRemoveSection(sectionIndex)}
                                >
                                    <Cross2Icon />
                                </button>
                            </div>
                        </div>
                        <div className="section-columns">
                            <Droppable
                                // droppableId={fieldFormSection.fieldname as string}
                                droppableId={`${tabIndex}:${sectionIndex}:${fieldFormSection.fieldname}`}
                                type={ItemTypes.COLUMN}
                                direction="horizontal"
                                ignoreContainerClipping={true}
                                isCombineEnabled={false}
                            >
                                {(provided: DroppableProvided) => (
                                    <div className="section-columns-container min-h-[200px]" ref={provided.innerRef} {...provided.droppableProps}>
                                        {fieldFilterByPositions?.components?.map((field: FieldDto, columnIndex: number) => {
                                            return (
                                                <SectionColumn
                                                    tabName={tabName}
                                                    sectionName={fieldFilterByPositions.fieldname as string}
                                                    tabIndex={tabIndex}
                                                    sectionIndex={sectionIndex}
                                                    columnIndex={columnIndex}
                                                    key={field.fieldname}
                                                    fields={field}
                                                    isCombineEnabled={false}
                                                    useClone={true}
                                                    isScrollable={false}
                                                />
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                        </div>
                    </div>
                </div>
            )}
        </Draggable>
        // <div className="form-section-container">
        //     <div
        //         onMouseEnter={handleMouseEnter}
        //         onMouseLeave={handleMouseLeave}
        //         className={cx("form-section", isHovered ? "hovered" : "")}
        //         title="details_section">
        //         <div className="section-header has-label">
        //             <div className="section-label">
        //                 <div title="Double click to edit label">
        //                     <span data-v-a015357f="">{label}</span>
        //                 </div>
        //             </div>
        //             <div className="section-actions">
        //                 <button className="btn btn-xs btn-section" title="Move the current section and the following sections to a new tab">
        //                     <MoveIcon />
        //                 </button>
        //                 <button className="btn btn-xs btn-section" title="Add section above">
        //                     <PlusIcon />
        //                 </button>
        //                 <button className="btn btn-xs btn-section" title="Remove section">
        //                     <Cross2Icon />
        //                 </button>
        //             </div>
        //         </div>
        //         <div className="section-columns">
        //             <DragDropContext onDragEnd={onDragEnd}>
        //                 <Droppable
        //                     droppableId={fieldFormSection.fieldname as string}
        //                     type="COLUMN"
        //                     direction="horizontal"
        //                     ignoreContainerClipping={true}
        //                     isCombineEnabled={true}
        //                 >
        //                     {(provided: DroppableProvided) => (
        //                         <div className="section-columns-container" ref={provided.innerRef} {...provided.droppableProps}>
        //                             {fieldFilterByPositions?.components?.map((field: FieldDto, columnIndex: number) => {
        //                                 return (
        //                                     <SectionColumn
        //                                         tabName={tabName}
        //                                         sectionName={fieldFilterByPositions.fieldname}
        //                                         tabIndex={tabIndex}
        //                                         sectionIndex={sectionIndex}
        //                                         columnIndex={columnIndex}
        //                                         key={field.fieldname}
        //                                         list={field}
        //                                         setList={setListA}
        //                                         isCombineEnabled={true}
        //                                         useClone={true}
        //                                         isScrollable={false}
        //                                     />
        //                                 )
        //                             })}
        //                             {provided.placeholder}
        //                         </div>
        //                     )}
        //                 </Droppable>
        //             </DragDropContext>
        //             {/* <div className="section-columns-container">
        //                 {fieldFilterByPositions?.components?.map((field: FieldDto, columnIndex: number) => {
        //                     return (
        //                         <SectionColumn
        //                             tabName={tabName}
        //                             sectionName={fieldFilterByPositions.fieldname}
        //                             tabIndex={tabIndex}
        //                             sectionIndex={sectionIndex}
        //                             columnIndex={columnIndex}
        //                             key={field.fieldname}
        //                             list={field}
        //                             setList={setListA}
        //                         // moveItem={moveItem}
        //                         // listId={field.fieldname} 
        //                         />
        //                     )
        //                 })}

        //             </div> */}

        //         </div>
        //     </div>
        // </div>
    )
}