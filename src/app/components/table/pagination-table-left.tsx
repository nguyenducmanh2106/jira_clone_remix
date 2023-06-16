import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as Select from '@radix-ui/react-select';

import classnames from 'classix'

import { AgGridReact } from 'ag-grid-react';
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
export const PaginationTableLeft = (props: IStatusPanelParams): JSX.Element => {

  const [totalRecord, setTotalRecord] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      // console.log(props.api.paginationGetRowCount())
      setTotalRecord(props.api.paginationGetRowCount())
    }, 300)
  }, []);

  return (
    <div className="whitespace-nowrap dark:border-white bg-white py-[12px] px-[16px] text-2xs text-bla dark:bg-dark-500 dark:text-white">
      <div className="flex items-center justify-between h-[32px]">
        <div className="left-pagination hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Tổng số:
              <span className="font-medium pl-[4px]">{totalRecord}</span>
            </p>
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
