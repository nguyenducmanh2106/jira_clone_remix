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
import { GridApi, IStatusPanelParams } from 'ag-grid-enterprise';
// import { SelectContent, SelectItemIndicator, SelectTrigger } from '@radix-ui/react-select';

export interface INoRowsOverlay {
  noRowsMessageFunc: string;
  defaultPageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalRecord: number;
  gridRef: React.RefObject<AgGridReact<any>>
}
export const PaginationTableRight = (props: IStatusPanelParams): JSX.Element => {

  useEffect(() => {
    setTimeout(() => {
      checkNextOrPreviousPage(props.api)
    }, 300)
  }, []);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false)
  const [firstRecord, setFirstRecord] = useState<number>(0)
  const [lastRecord, setLastRecord] = useState<number>(0)

  // const firstRecord = useMemo<number>(() => {
  //   return ((props.api.paginationGetCurrentPage() ?? 0)) * props.api.paginationGetPageSize() + 1
  // }, [props.api.paginationGetCurrentPage()])
  const onChangePageSize = (value: string) => {
    // console.log(props.gridRef.current?.api.paginationGetRowCount())

    props.api.paginationSetPageSize(+value);
    checkNextOrPreviousPage(props.api)
    // props.gridRef.current!.api.setCacheBlockSize(+value);
    // props.gridRef.current!.api.paginationGoToPage(4);
  }
  const onChangePageIndex = (value: "first-page" | "prev-page" | "next-page" | "last-page") => {

    switch (value) {
      case "first-page":
        props.api.paginationGoToFirstPage()
        break;
      case "prev-page":
        props.api.paginationGoToPreviousPage()
        break;
      case "next-page":
        props.api.paginationGoToNextPage()
        break;
      case "last-page":
        props.api.paginationGoToLastPage()
        break;
    }
    checkNextOrPreviousPage(props.api)

  }

  const checkNextOrPreviousPage = (gridApi: GridApi<any> | undefined) => {
    const currentPage = gridApi?.paginationGetCurrentPage() ?? 0
    const totalPages = gridApi?.paginationGetTotalPages() ?? 0;
    setFirstRecord((currentPage) * props.api.paginationGetPageSize() + 1)
    setLastRecord((currentPage + 1) * props.api.paginationGetPageSize())
    setHasPreviousPage(currentPage > 0);
    console.log(currentPage, totalPages, currentPage < totalPages - 1)
    setHasNextPage(currentPage < totalPages - 1)
  }
  const SelectDemo = () => (
    <Select.Root
      name="Changepage"
      // eslint-disable-next-line react/prop-types
      defaultValue={props.api.paginationGetPageSize().toString()}
      onValueChange={onChangePageSize}
    >
      <SelectTrigger className={classnames('bg-[#fff]', '!border-solid', 'border-[1px]', 'border-[#d3d7de]')} aria-label="Open change page size select">

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
    <div className="whitespace-nowrap dark:border-white bg-white py-[12px] px-[16px] text-2xs text-bla dark:bg-dark-500 dark:text-white">
      <div className="flex items-center justify-between h-[32px]">
        <div className="right-pagination hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
          <div className='change-pageSize flex h-[32px]'>
            <SelectDemo />
          </div>
          <div className='change-page flex h-[32px] ml-[12px]'>
            <nav className="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
              <div className="pager self-center flex flex-row btn-group-link">
                <div className="self-center hover:rounded-[50%] hover:bg-grey-600">
                  <button disabled={!hasPreviousPage} onClick={() => onChangePageIndex("first-page")}
                    className="flex wrap-misa-active wrap-misa-active-circle-small link previous-start-page previous-page icon-start-page disable-next-prev" data-current-page="1" title="Trang đầu">
                    <RiSkipBackLine color={hasPreviousPage ? "#586074" : "#bdc3c7"} size={"24px"} />
                  </button>
                </div>

                <div className="self-center hover:rounded-[50%] hover:bg-grey-600">
                  <button disabled={!hasPreviousPage} onClick={() => onChangePageIndex("prev-page")}
                    className="flex wrap-misa-active wrap-misa-active-circle-small link previous-page previous-one-page icon-previous-page disable-next-prev" data-current-page="1" title="Trang trước">
                    <RiArrowLeftSLine color={hasPreviousPage ? "#586074" : "#bdc3c7"} size={"24px"} />
                  </button>
                </div>

                <div className="current-page self-center flex mx-[4px]">
                  <b className="count-to">{firstRecord}</b>
                  <span className="px-[8px]">đến</span>
                  <b className="count-from">{lastRecord}</b>
                </div>
                <div className="self-center hover:rounded-[50%] hover:bg-grey-600">
                  <button disabled={!hasNextPage} onClick={() => onChangePageIndex("next-page")}
                    className="flex wrap-misa-active wrap-misa-active-circle-small link previous-page previous-one-page icon-previous-page disable-next-prev" data-current-page="1" title="Trang trước">
                    <RiArrowRightSLine color={hasNextPage ? "#586074" : "#bdc3c7"} size={"24px"} />
                  </button>
                </div>
                <div className="self-center hover:rounded-[50%] hover:bg-grey-600">
                  <button disabled={!hasNextPage} onClick={() => onChangePageIndex("last-page")}
                    className="flex wrap-misa-active wrap-misa-active-circle-small link previous-page previous-one-page icon-previous-page disable-next-prev" data-current-page="1" title="Trang trước">
                    <RiSkipForwardLine color={hasNextPage ? "#586074" : "#bdc3c7"} size={"24px"} />
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
