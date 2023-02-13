import { useCallback, useMemo, useRef, useState, Fragment } from "react";
import cx from "classix";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { getUsers } from "@infrastructure/db/user";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  RowModelType,
} from 'ag-grid-community';
import { HeaderTableView } from "./header";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export const TableView = ({
  show = true,
}: TooltipProps): JSX.Element => {

  const gridRef = useRef<AgGridReact<IOlympicData>>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '500px' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // { field: 'id', maxWidth: 75, sortable: true },
    // { field: 'title', minWidth: 190, sortable: true },
    // { field: 'price' },
    // { field: 'description' },
  ]);

  const colDefsMedalsExcluded: ColDef[] = [
    {
      field: 'id',
      maxWidth: 75,
      sortable: true,
      headerComponentParams: { menuIcon: 'fa-external-link-alt' },
    },
    { field: 'title', minWidth: 190, sortable: true },
    { field: 'price' },
    { field: 'description' },
  ];
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 90,
      resizable: true,
    };
  }, []);

  const components = useMemo<{
    [p: string]: any;
  }>(() => {
    return {
      agColumnHeader: HeaderTableView,
    };
  }, []);


  const getServerSideDatasource: (server: (skip: number, limit: number) => Promise<any>) => IServerSideDatasource = (
    server: any
  ) => {
    return {
      getRows: async (params) => {
        console.log('[Datasource] - rows requested by grid: ', params.request);
        const response = await server(params.request.startRow, params.request.endRow);
        // console.log(response);
        // adding delay to simulate real server call
        setTimeout(function () {
          // if (response.success) {
          // eslint-disable-next-line no-constant-condition
          if (true) {
            // call the success callback
            params.success({
              rowData: response.products,
              rowCount: response.total,
            });
          } else {
            // inform the grid request failed
            params.fail();
          }
        }, 200);
      },
    };
  };

  /**
   * get data from api
   * @param skip 
   * @param limit 
   * @returns 
   */
  const getData = async (skip: number, limit: number) => {
    // const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price`)
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
    const data = await response.json()
    return data;
  }

  /**
   * function run when ag-grid run
   */
  const onGridReady = useCallback(async (params: GridReadyEvent) => {

    //chồ này gọi api để lấy danh sách cột
    setTimeout(() => {
      // setColumnDefs(colDefsMedalsExcluded)
      gridRef.current!.api.setColumnDefs(colDefsMedalsExcluded);
    }, 2000)

    //chỗ này tiến hành lấy dự liệu về fill vào table
    const datasource = getServerSideDatasource(getData);
    params.api!.setServerSideDatasource(datasource);
  }, []);
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="relative">
      <div
        className={cx(
          "block"
        )}
      >
        <div className="whitespace-nowrap rounded bg-font-main py-0.5 px-1.5 text-2xs text-white dark:bg-dark-500">
          table
        </div>
        <div className="tableViewContainer">
          <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
              <AgGridReact<IOlympicData>
                ref={gridRef}
                columnDefs={columnDefs}
                components={components}
                defaultColDef={defaultColDef}
                rowModelType={'serverSide'}
                pagination={true}
                paginationPageSize={10}
                cacheBlockSize={10}
                animateRows={true}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TooltipProps {
  show?: boolean;
}

export interface IOlympicData {
  title: string;
  price: number;
  id: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
}



type ResponseData<T> = {
  products: T;
  limit: number;
  skip: number;
  total: number;
}