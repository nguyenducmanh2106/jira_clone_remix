import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import DraggableItem from "./DraggableItem";

const ListContainer = ({ id, text, index, listId, moveItem }) => {

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
    <div ref={(node) => dragRef(dropRef(node))} style={{ border: '1px solid black', padding: '8px', margin: '4px' }}>
      {text}
    </div>
  );
};
export default ListContainer;