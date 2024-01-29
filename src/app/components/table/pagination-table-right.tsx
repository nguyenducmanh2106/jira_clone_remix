import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';

import { GridApi, IStatusPanelParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
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
    }, 2000);
  }, []);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false)
  // const [firstRecord, setFirstRecord] = useState<number>(0)
  // const [lastRecord, setLastRecord] = useState<number>(0)

  const onChangePageSize = (value: string) => {
    // console.log(props.gridRef.current?.api.paginationGetRowCount())
    props.api.paginationSetPageSize(+value);
    // props.api.setCacheBlockSize(+value);
    // props.api.refreshServerSide({ route: undefined, purge: true });
    checkNextOrPreviousPage(props.api)
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
    // setFirstRecord((currentPage) * props.api.paginationGetPageSize() + 1)
    // setLastRecord((currentPage + 1) * props.api.paginationGetPageSize())
    setHasPreviousPage(currentPage > 0);
    console.log(currentPage, totalPages, currentPage < totalPages - 1)
    setHasNextPage(currentPage < totalPages - 1)
  }
  const SelectDemo = () => (
    <>
      <p className="text-sm font-medium">Bản ghi trên trang</p>
      <Select
        // eslint-disable-next-line react/prop-types
        value={props.api.paginationGetPageSize().toString()}
        onValueChange={onChangePageSize}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
  return (
    <div className="whitespace-nowrap dark:border-white bg-white py-[12px] px-[16px] text-2xs text-bla dark:bg-dark-500 dark:text-white text-black">
      <div className="flex items-center justify-between h-[32px]">
        <div className="right-pagination hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
          <div className='change-pageSize flex items-center space-x-2 h-[32px]'>
            <SelectDemo />
          </div>
          <div className='change-page flex h-[32px] ml-[12px]'>
            <nav className="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  disabled={!hasPreviousPage}
                  onClick={() => onChangePageIndex("first-page")}
                >
                  <span className="sr-only">Go to first page</span>
                  <DoubleArrowLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  disabled={!hasPreviousPage}
                  onClick={() => onChangePageIndex("prev-page")}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <div className="current-page self-center flex mx-[4px]">
                  <b className="count-to">{(props.api?.paginationGetCurrentPage() ?? 0) * props.api.paginationGetPageSize() + 1}</b>
                  <span className="px-[8px]">đến</span>
                  <b className="count-from">{((props.api?.paginationGetCurrentPage() ?? 0) + 1) * props.api.paginationGetPageSize()}</b>
                </div>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  disabled={!hasNextPage}
                  onClick={() => onChangePageIndex("next-page")}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  disabled={!hasNextPage}
                  onClick={() => onChangePageIndex("last-page")}
                >
                  <span className="sr-only">Go to last page</span>
                  <DoubleArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
