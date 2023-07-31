import { CopyIcon, Cross2Icon, MoveIcon, PlusIcon } from "@radix-ui/react-icons"
import { SectionColumn } from "./section-column"
import { useEffect, useState } from "react";
import cx from "classix";
import { useDispatch, useSelector } from "react-redux";
import { sectionColumnByPosition } from "@app/store/Slice/fieldSectionSlice";
export type FormSectionProps = {
    label: string,
    positionTab: number,
    positionFormSection: number
}
export function FormSection(props: FormSectionProps) {

    const dispatch = useDispatch()

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    useEffect(() => {
        dispatch(sectionColumnByPosition({ positionTab: props.positionTab, positionFormSection: props.positionFormSection }))
    }, [])
    const { fields } = useSelector(state => state.fieldSection)

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const [listA, setListA] = useState([
        { id: 1, text: 'Item A1' },
        { id: 2, text: 'Item A2' },
        { id: 3, text: 'Item A3' },
        { id: 4, text: 'Item B1' },
        { id: 5, text: 'Item B2' },
        { id: 6, text: 'Item B3' },
    ]);

    const [listB, setListB] = useState([
        { id: 4, text: 'Item B1' },
        { id: 5, text: 'Item B2' },
        { id: 6, text: 'Item B3' },
    ]);
    const moveItem = (fromListId, fromIndex, toListId, toIndex) => {
        const item = fromListId === 'listA' ? listA[fromIndex] : listB[fromIndex];
        if (fromListId === toListId) {
            const newList = fromListId === 'listA' ? [...listA] : [...listB];
            newList.splice(fromIndex, 1);
            newList.splice(toIndex, 0, item);
            if (fromListId === 'listA') {
                setListA(newList);
            } else {
                setListB(newList);
            }
        } else {
            const fromList = fromListId === 'listA' ? [...listA] : [...listB];
            fromList.splice(fromIndex, 1);
            const toList = toListId === 'listA' ? [...listA] : [...listB];
            toList.splice(toIndex, 0, item);
            fromListId === 'listA' ? setListA(fromList) : setListB(fromList)
            toListId === 'listA' ? setListA(toList) : setListB(toList)
        }
    };

    return (
        <div className="form-section-container">
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cx("form-section", isHovered ? "hovered" : "")}
                title="details_section">
                <div className="section-header has-label">
                    <div className="section-label">
                        <div title="Double click to edit label">
                            <span data-v-a015357f="">{props.label}</span>
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
                        <SectionColumn list={listA} setList={setListA} moveItem={moveItem} listId="listA" />
                        <SectionColumn list={listA} setList={setListA} moveItem={moveItem} listId="listA" />
                    </div>
                </div>
            </div>
        </div>
    )
}