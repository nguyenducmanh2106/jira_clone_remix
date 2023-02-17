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
// import { SelectContent, SelectItemIndicator, SelectTrigger } from '@radix-ui/react-select';

export interface INoRowsOverlay {
  noRowsMessageFunc: string;
  gridRef: React.RefObject<AgGridReact<any>>
}
export const PaginationTable = (props: INoRowsOverlay): JSX.Element => {
  const [totalCount, setTotalCount] = useState<number>(0)
  // const totalCount = useMemo(() => {
  //   return props.gridRef.current?.api.paginationGetRowCount() ?? 0;
  // }, [props.gridRef]);
  useEffect
  const onValueChange = (value: string) => {
    // console.log('onValueChange', value);
    console.log(props.gridRef.current?.api.paginationGetRowCount())
    props.gridRef.current!.api.paginationSetPageSize(+value);
    // props.gridRef.current!.api.setCacheBlockSize(+value);paginationGetRowCount
    // props.gridRef.current!.api.paginationGoToPage(4);
  }
  const SelectDemo = () => (
    <Select.Root
      name="asignee"
      defaultValue={"10"}
      onValueChange={onValueChange}
    >
      <SelectTrigger aria-label="Open asignee select">

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
    <div className="whitespace-nowrap border-solid border-x border-y border-t-0 border-indigo-600 dark:border-white bg-white py-[12px] px-[16px] text-2xs text-bla dark:bg-dark-500 dark:text-white">
      <div className="flex items-center justify-between">
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
        <div className="right-pagination hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <SelectDemo />
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
