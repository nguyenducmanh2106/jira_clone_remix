import { IHeaderParams } from 'ag-grid-community';
import type { FC, ReactInstance } from 'react'
import { useEffect, useState } from 'react'
import {
    DragDropContext, Droppable, Draggable,
    type DroppableProvided,
    type DraggableProvided,
    type DraggableStateSnapshot,
    type DraggableRubric,
    type DropResult,
    type ResponderProvided,
} from "react-beautiful-dnd";
import QuoteItem from './quote-item';

export const ListColumnDrag = (): JSX.Element => {

    // fake data generator
    const getItems = (count: number) =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k}`,
            content: `item ${k}`
        }));

    // a little function to help us with reordering the result
    const reorder = (list: { id: string, content: string }[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const grid = 8;

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
    });


    const [items, setItems] = useState<{ id: string, content: string }[]>(getItems(10))

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        console.log('drag')
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        // if (result.source.index === result.destination.index) {
        //     return;
        // }

        const itemReOrders = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        setItems(itemReOrders)
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(droppableProvided, droppableSnapshot) => (
                    <div
                        ref={droppableProvided.innerRef}
                        style={getListStyle(
                            droppableSnapshot.isDraggingOver,
                        )}
                        onScroll={(e) =>
                            // eslint-disable-next-line no-console
                            console.log('current scrollTop', e.currentTarget.scrollTop)
                        }
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(draggableProvided, draggableSnapshot) => (
                                    <div
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                        style={getItemStyle(
                                            draggableSnapshot.isDragging,
                                            draggableProvided.draggableProps.style,
                                        )}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {droppableProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}