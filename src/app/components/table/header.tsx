import React, { Fragment, useEffect, useRef, useState } from 'react';
import { IHeaderParams } from 'ag-grid-community';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export interface ICustomHeaderParams extends IHeaderParams {
  menuIcon: string;
}

export const HeaderTableView = (props: ICustomHeaderParams): JSX.Element => {
  console.log(props)
  const [ascSort, setAscSort] = useState('inactive');
  const [descSort, setDescSort] = useState('inactive');
  const [noSort, setNoSort] = useState('inactive');
  const refButton = useRef(null);

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current!);
  };

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? 'active' : 'inactive');
    setDescSort(props.column.isSortDescending() ? 'active' : 'inactive');
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending()
        ? 'active'
        : 'inactive'
    );
  };

  const onSortRequested = (order: 'asc' | 'desc' | null, event: any) => {
    props.setSort(order, event.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
  }, []);

  let menu = null;
  if (props.enableMenu) {
    menu = (
      <div
        ref={refButton}
        className="customHeaderMenuButton"
        onClick={() => onMenuClicked()}
      >
        X
        {/* <i className={`fa ${props.menuIcon}`}></i> */}
      </div>
    );
  }

  let sort = null;
  if (props.enableSorting) {
    sort = (
      <div style={{ display: 'inline-block' }}>
        <div
          onClick={(event) => onSortRequested('asc', event)}
          onTouchEnd={(event) => onSortRequested('asc', event)}
          className={`customSortDownLabel ${ascSort}`}
        >
          <i className="fa fa-long-arrow-alt-down"></i>
        </div>
        <div
          onClick={(event) => onSortRequested('desc', event)}
          onTouchEnd={(event) => onSortRequested('desc', event)}
          className={`customSortUpLabel ${descSort}`}
        >
          <i className="fa fa-long-arrow-alt-up"></i>
        </div>
        <div
          onClick={(event) => onSortRequested(null, event)}
          onTouchEnd={(event) => onSortRequested(null, event)}
          className={`customSortRemoveLabel ${noSort}`}
        >
          <i className="fa fa-times"></i>
        </div>
      </div>
    );
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div className='customHeader'>
      {menu}
      <div className="customHeaderLabel">{props.displayName}</div>
      {sort}
    </div>
  );
};
