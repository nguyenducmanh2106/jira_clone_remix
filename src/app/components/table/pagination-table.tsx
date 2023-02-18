import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import classnames from 'classix'
import {
  SelectTrigger,
  SelectTriggerIcon,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
} from "@app/components/select";
import { AgGridReact } from 'ag-grid-react';
import { RiArrowLeftSLine, RiArrowRightSLine, RiSkipBackLine, RiSkipForwardLine } from 'react-icons/ri';
// import { SelectContent, SelectItemIndicator, SelectTrigger } from '@radix-ui/react-select';

export interface INoRowsOverlay {
  noRowsMessageFunc: string;
  defaultPageSize: number;
  gridRef: React.RefObject<AgGridReact<any>>
}
export const PaginationTable = (props: INoRowsOverlay): JSX.Element => {
  console.log(props.gridRef.current?.api.paginationGetRowCount())
  const totalCount = useMemo(() => {
    return props.gridRef.current?.api.paginationGetRowCount() ?? 0;
  }, [props.gridRef, props.gridRef.current, props.gridRef.current?.api, props.gridRef.current?.api.paginationGetRowCount()]);

  const onValueChange = (value: string) => {
    // console.log('onValueChange', value);
    console.log(props.gridRef.current?.api.paginationGetRowCount())
    props.gridRef.current!.api.paginationSetPageSize(+value);
    // props.gridRef.current!.api.setCacheBlockSize(+value);paginationGetRowCount
    // props.gridRef.current!.api.paginationGoToPage(4);
  }
  const onChangePageSize = (value: "first-page" | "prev-page" | "next-page" | "last-page") => {
    switch (value) {
      case "first-page":
        props.gridRef.current!.api.paginationGoToFirstPage()
        break;
      case "prev-page":
        props.gridRef.current!.api.paginationGoToPreviousPage()
        break;
      case "next-page":
        props.gridRef.current!.api.paginationGoToNextPage()
        break;
      case "last-page":
        props.gridRef.current!.api.paginationGoToLastPage()
        break;
    }
  }
  const SelectDemo = () => (
    <Select.Root
      name="Changepage"
      defaultValue={props.defaultPageSize.toString()}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={classnames('bg-[#fff]', '!border-solid','border-[1px]', 'border-[#d3d7de]')} aria-label="Open change page size select">

        <Select.Value />
        {/* <div className="ml-2">
          bản ghi trên trang
        </div> */}
        <SelectTriggerIcon />
      </SelectTrigger>
      <SelectContent>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <SelectItem key={1} value={"10"}>
            <SelectItemIndicator />
            <Select.ItemText>{"10"}</Select.ItemText>
          </SelectItem>
          <SelectItem key={2} value={"20"}>
            <SelectItemIndicator />
            <Select.ItemText>{"20"}</Select.ItemText>
          </SelectItem>
          <SelectItem key={2} value={"50"}>
            <SelectItemIndicator />
            <Select.ItemText>{"50"}</Select.ItemText>
          </SelectItem>
          <SelectItem key={2} value={"100"}>
            <SelectItemIndicator />
            <Select.ItemText>{"100"}</Select.ItemText>
          </SelectItem>
          <Select.Separator />
        </Select.Viewport>
        <Select.ScrollDownButton />
      </SelectContent>
    </Select.Root>
  );
  return (
    <div className="whitespace-nowrap border-solid border-x border-y border-t-0 border-[#bdc3c7] dark:border-white bg-white py-[12px] px-[16px] text-2xs text-bla dark:bg-dark-500 dark:text-white">
      <div className="flex items-center justify-between h-[32px]">
        <div className="left-pagination hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Tổng số:
              <span className="font-medium pl-[4px]">{totalCount}</span>
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

            </nav>
          </div>
        </div>
        <div className="right-pagination hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
          <div className='change-pageSize flex h-[32px]'>
            <SelectDemo />
          </div>
          <div className='change-page flex h-[32px] ml-[12px]'>
            <nav className="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
              <div className="pager self-center flex flex-row btn-group-link">
                <div className="self-center hover:rounded-[50%] hover:bg-grey-600">
                  <button onClick={() => onChangePageSize("first-page")}
                    className="flex wrap-misa-active wrap-misa-active-circle-small link previous-start-page previous-page icon-start-page disable-next-prev" data-current-page="1" title="Trang đầu">
                    <RiSkipBackLine color="#bdc3c7" size={"24px"} />
                  </button>
                </div>

                <div className="self-center hover:rounded-[50%] hover:bg-grey-600">
                  <button onClick={() => onChangePageSize("prev-page")}
                    className="flex wrap-misa-active wrap-misa-active-circle-small link previous-page previous-one-page icon-previous-page disable-next-prev" data-current-page="1" title="Trang trước">
                    <RiArrowLeftSLine color="#bdc3c7" size={"24px"} />
                  </button>
                </div>

                <div className="current-page self-center flex mx-[4px]">
                  <b className="count-to">1</b>
                  <span className="px-[8px]">đến</span>
                  <b className="count-from"> 20</b>
                  <input type="hidden" className="input-data" defaultValue={20} />
                </div>
                <div className="self-center hover:rounded-[50%] hover:bg-grey-600">
                  <button onClick={() => onChangePageSize("next-page")}
                    className="flex wrap-misa-active wrap-misa-active-circle-small link previous-page previous-one-page icon-previous-page disable-next-prev" data-current-page="1" title="Trang trước">
                    <RiArrowRightSLine color="#586074" size={"24px"} />
                  </button>
                </div>
                <div className="self-center hover:rounded-[50%] hover:bg-grey-600">
                  <button onClick={() => onChangePageSize("last-page")}
                    className="flex wrap-misa-active wrap-misa-active-circle-small link previous-page previous-one-page icon-previous-page disable-next-prev" data-current-page="1" title="Trang trước">
                    <RiSkipForwardLine color="#586074" size={"24px"} />
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
