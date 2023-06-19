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
};

const colors = {
  N30: 'red',
  N0: 'black',
  G100: 'black',
  G200: 'black',
  N900: 'black',
  N70: 'black',
}

const getBackgroundColor = (
  isDragging: boolean,
  isGroupedOver: boolean,
  authorColors: AuthorColors,
) => {
  if (isDragging) {
    return authorColors.soft;
  }

  if (isGroupedOver) {
    return colors.N30;
  }

  return colors.N0;
};

const getBorderColor = (isDragging: boolean, authorColors: AuthorColors) => {
  return isDragging ? 'red' : 'grey';
  // return isDragging ? authorColors.hard : 'grey';

}

const imageSize = 40 as number;

const CloneBadge = styled.div`
  background: ${colors.G100};
  bottom: ${grid / 2}px;
  border: 2px solid ${colors.G200};
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);

  height: ${imageSize}px;
  width: ${imageSize}px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${(props) => getBorderColor(props.isDragging, props.colors)};
  background-color: ${(props) =>
    getBackgroundColor(props.isDragging, props.isGroupedOver, props.colors)};
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px ${colors.N70}` : 'none'};
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;

  /* anchor overrides */
  color: ${colors.N900};

  &:hover,
  &:active {
    color: ${colors.N900};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props?.colors?.hard ?? 'red'};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;

  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;

  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }

  &::after {
    content: close-quote;
  }
`;

function getStyle(provided: DraggableProvided, style: object | null | undefined) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
    border: '1px solid grey',
    backgroundColor: '#f0f2f4',
    padding: '0 8px',
  };
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
  } = props;

  return (
    <Container
      // isDragging={isDragging}
      // isGroupedOver={isGroupedOver}
      // isClone={isClone}
      // colors={'red'}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={quote.colId}
      data-index={index}
      className='mb-[8px]'
    // aria-label={`${quote.author?.name ?? 'author'} quote ${quote.content}`}
    >
      {isClone ? <CloneBadge>Clone</CloneBadge> : null}
      <Content>
        <div className='flex'>
          <div className='cursor-move mx-[4px]'>
            <div className='dragable-icon'></div>
          </div>
          <BlockQuote>{quote?.headerName ?? 'N/A'}</BlockQuote>
        </div>
      </Content>
    </Container>
  );
}

export default React.memo<Props>(QuoteItem);