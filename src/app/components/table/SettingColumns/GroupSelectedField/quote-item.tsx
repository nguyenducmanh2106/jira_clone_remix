// @flow
import React from 'react';
import styled from '@emotion/styled';
import { borderRadius, grid } from './constants';
import type { AuthorColors } from './types';
import type { DraggableProvided } from 'react-beautiful-dnd';
import { ColDef } from 'ag-grid-community';

type Props = {
  quote: ColDef,
  isDragging: boolean,
  provided: DraggableProvided,
  isClone?: boolean,
  isGroupedOver?: boolean,
  style?: object,
  index?: number,
  toggleDisplayColumns: (column: ColDef) => void
};

function getStyle({ provided, style, isDragging }): { provided: DraggableProvided | any, style: object | any, isDragging: boolean | any } {
  // If you don't want any spacing between your items
  // then you could just return this.
  // I do a little bit of magic to have some nice visual space
  // between the row items
  const combined = {
    ...style,
    ...provided.draggableProps.style
  };

  const marginBottom = 8;
  const withSpacing = {
    ...combined,
    height: isDragging ? combined.height : combined.height - marginBottom,
    marginBottom
  };
  return withSpacing;
}

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function QuoteItem(props: Props) {
  const {
    quote,
    isDragging,
    isGroupedOver,
    provided,
    style,
    isClone,
    index,
    toggleDisplayColumns
  } = props;

  const hideColumn = (column: ColDef<any>) => {
    console.log(column)
    const columnState = {
      ...column,
      hide: true
    }
    toggleDisplayColumns(columnState)
  }
  return (
    <div
      // isDragging={isDragging}
      // isGroupedOver={isGroupedOver}
      // isClone={isClone}
      // colors={'red'}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle({ provided, style, isDragging })}
      data-is-dragging={isDragging}
      data-testid={quote.colId}
      data-index={index}
    >
      {/* {isClone ? <CloneBadge>Clone</CloneBadge> : null} */}
      <div className='h-full flex items-center justify-between'>
        <div className='flex h-full items-center'>
          <div className='cursor-move mx-[4px]'>
            <div className='dragable-icon'></div>
          </div>
          <div>{quote?.headerName ?? 'N/A'}</div>
        </div>
        <div className='icon-close16-red' onClick={() => hideColumn(quote)}></div>
      </div>
    </div>
  );
}

export default React.memo<Props>(QuoteItem);