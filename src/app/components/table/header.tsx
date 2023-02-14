import React, { useEffect, useRef, useState } from 'react';
import { IHeaderParams } from 'ag-grid-community';
import { Dropdown } from "flowbite-react";
// import ReactPortal from '../portal';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DrawingPinIcon,
  CircleBackslashIcon,
} from '@radix-ui/react-icons';
import { RiFilterLine } from "react-icons/ri";

export interface ICustomHeaderParams extends IHeaderParams {
  menuIcon: string;
  checkboxSelection: boolean
}

export const HeaderTableView = (props: ICustomHeaderParams): JSX.Element => {
  const [bookmarksChecked, setBookmarksChecked] = useState<boolean>(false);
  console.log(props)
  const [ascSort, setAscSort] = useState('inactive');
  const [descSort, setDescSort] = useState('inactive');
  const [noSort, setNoSort] = useState('inactive');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc' | null | string>('no-sort');
  const refButton = useRef(null);

  // const onMenuClicked = () => {
  //   props.showColumnMenu(refButton.current!);
  // };

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? 'active' : 'inactive');
    setDescSort(props.column.isSortDescending() ? 'active' : 'inactive');
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending()
        ? 'active'
        : 'inactive'
    );

    const sortFilter = props.column.isSortAscending() ? "asc" : props.column.isSortDescending() ? "desc" : 'no-sort';
    setSortOrder(sortFilter)
  };

  const onSortRequested = (order: 'asc' | 'desc' | null, event: any) => {
    props.setSort(order, event.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    // onSortChanged();

    // 👇️ remove the event listener when the component unmounts
    return () => {
      props.column.removeEventListener('sortChanged', onSortChanged);
    };
  }, []);

  let menu = null;
  if (props.enableMenu) {
    menu = (
      <div className="filter">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-auto outline-none hover:bg-violet3"
              aria-label="Customise menu"
            >
              <RiFilterLine />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content onClick={event => event.stopPropagation()}
              className="min-w-[220px] z-50 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >

              <DropdownMenu.Item
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                <ArrowUpIcon />
                <div className="ml-[4px] pr-[4px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                  Sort ascending
                </div>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                <ArrowDownIcon />
                <div className="ml-[4px] pr-[4px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                  Sort descending
                </div>
              </DropdownMenu.Item>

              <DropdownMenu.Arrow className="fill-white" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    );
  }

  let sort = null;
  if (props.enableSorting) {
    sort = (
      <div className="filter">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-auto outline-none hover:bg-violet3"
              aria-label="Customise options"
            >
              {/* <HamburgerMenuIcon /> */}
              {props.displayName}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[220px] z-50 bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              <DropdownMenu.RadioGroup value={sortOrder} onValueChange={setSortOrder}>
                <DropdownMenu.RadioItem onClick={event => onSortRequested('asc', event)} onTouchEnd={event => onSortRequested('asc', event)}
                  className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  value="asc"
                >
                  <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  <div className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                    <ArrowUpIcon />
                    <div className="ml-[4px] pr-[4px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                      Sort ascending
                    </div>
                  </div>
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem onClick={event => onSortRequested('desc', event)} onTouchEnd={event => onSortRequested('desc', event)}
                  className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  value="desc"
                >
                  <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  <div className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                    <ArrowDownIcon />
                    <div className="ml-[4px] pr-[4px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                      Sort descending
                    </div>
                  </div>
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem onClick={event => onSortRequested(null, event)} onTouchEnd={event => onSortRequested(null, event)}
                  className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  value="no-sort"
                >
                  <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <CheckIcon />
                  </DropdownMenu.ItemIndicator>
                  <div className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] relative select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                    <CircleBackslashIcon />
                    <div className="ml-[4px] pr-[4px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                      No Sort
                    </div>
                  </div>
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
              {/* <DropdownMenu.Item onClick={event => onSortRequested('asc', event)} onTouchEnd={event => onSortRequested('asc', event)}
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                <ArrowUpIcon />
                <div className="ml-[4px] pr-[4px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                  Sort ascending
                </div>
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={event => onSortRequested('desc', event)} onTouchEnd={event => onSortRequested('desc', event)}
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                <ArrowDownIcon />
                <div className="ml-[4px] pr-[4px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                  Sort descending
                </div>
              </DropdownMenu.Item> */}
              <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" />
              <DropdownMenu.CheckboxItem
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                checked={bookmarksChecked}
                onCheckedChange={setBookmarksChecked}
              >
                <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <CheckIcon />
                </DropdownMenu.ItemIndicator>
                <DrawingPinIcon />
                <div className="ml-[4px] pr-[4px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                  Ghim cột
                </div>
              </DropdownMenu.CheckboxItem>
              {/* <DropdownMenu.CheckboxItem
                className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                checked={urlsChecked}
                onCheckedChange={setUrlsChecked}
              >
                <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <CheckIcon />
                </DropdownMenu.ItemIndicator>
                Show Full URLs
              </DropdownMenu.CheckboxItem> */}

              <DropdownMenu.Arrow className="fill-white" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    );
  }

  let headComponentHtml = null;
  if (!props.checkboxSelection) {
    headComponentHtml = (
      <div className='customHeader flex items-center'>
        <div className='mr-2'>
          <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
        </div>
        <div className="customHeaderLabel mr-2 flex items-center">
          {sort}
          <div className="ml-[4px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
            {ascSort === 'active' ? <ArrowUpIcon /> : descSort === 'active' ? <ArrowDownIcon /> : <></>}
          </div>
        </div>
        {menu}
      </div >
    )
  }
  else {
    headComponentHtml = (
      <input type="checkbox" />
    )
  }

  return (
    <>{headComponentHtml}</>
  );
};
