import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const DraggableItem = ({ id, text, index, listId, moveItem }) => {
    const [, dragRef] = useDrag({
        type: ItemTypes.ITEM,
        item: { id, index, listId },
    });

    return (
        <div ref={dragRef} style={{ border: '1px solid black', padding: '8px', margin: '4px' }}>
            {text}
        </div>
    );
};

export default DraggableItem;