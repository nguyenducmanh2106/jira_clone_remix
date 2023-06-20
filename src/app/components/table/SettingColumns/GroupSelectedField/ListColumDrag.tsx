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
import { FixedSizeList as List, areEqual } from 'react-window';
import React from 'react';
import { ColDef, ColGroupDef } from 'ag-grid-community';
type RowProps = {
    data: ColDef[],
    index: number,
    style: any,
};
export interface Column {
    columns: ColDef[];
    toggleDisplayColumns: (column: ColDef) => void;
}
export const ListColumnDrag = ({ columns, toggleDisplayColumns }: Column): JSX.Element => {

    // a little function to help us with reordering the result
    const reorder = (list: ColDef[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const [quotes, setQuotes] = useState<ColDef[]>([])

    useEffect(() => {
        setQuotes(columns);
    }, [columns, columns?.length])


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
            quotes,
            result.source.index,
            result.destination.index
        );

        setQuotes(itemReOrders)
    }

    // Using a higher order function so that we can look up the quotes data to retrieve
    // our quote from within the rowRender function
    // eslint-disable-next-line react/display-name
    const Row = React.memo(({ data: quotes, index, style }: RowProps) => {
        const quote: ColDef = quotes[index];
        // console.log(quote)
        // console.log(index, quote)
        return (
            <Draggable draggableId={quote.colId as string} index={index} key={quote.colId}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <QuoteItem
                        provided={provided}
                        quote={quote}
                        isDragging={snapshot.isDragging}
                        isGroupedOver={Boolean(snapshot.combineTargetFor)}
                        style={{ marginBottom: '8px', background: '#f0f2f4', userSelect: 'none', padding: '4px 6px', borderRadius: '4px', ...style }}
                        index={index}
                        toggleDisplayColumns={toggleDisplayColumns}
                    />
                )}
            </Draggable>
        );
    }, areEqual);
    const styles = {
        borderLeft: '1px solid #c5c9d3',
        padding: '0 16px',
    }
    return (
        <div className='group-selected-field' style={styles}>
            <div className='group-selected-field__head flex justify-between mb-[16px]'>
                <div className='group-selected-field__head__title'>
                    Đã chọn({quotes.length})
                </div>
                <div className='group-selected-field__head__action--delete-all text-[#ec4243]'>
                    {/* Xóa tất cả */}
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="droppable"
                    mode="virtual"
                    renderClone={(
                        provided: DraggableProvided,
                        snapshot: DraggableStateSnapshot,
                        rubric: DraggableRubric,
                    ) => (
                        <QuoteItem
                            provided={provided}
                            isDragging={snapshot.isDragging}
                            quote={quotes[rubric.source.index]}
                            style={{ marginBottom: '8px', borderRadius: '4px', userSelect: 'none', padding: '4px 6px', background: '#f0f2f4' }}
                            index={rubric.source.index}
                            toggleDisplayColumns={toggleDisplayColumns}
                        />
                    )}
                >
                    {(droppableProvided: DroppableProvided) => (
                        <List
                            height={500}
                            itemCount={quotes.length as number}
                            itemSize={40}
                            width={'auto'}
                            // you will want to use List.outerRef rather than List.innerRef as it has the correct height when the list is unpopulated
                            outerRef={droppableProvided.innerRef}
                            itemData={quotes}
                        >
                            {Row}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}