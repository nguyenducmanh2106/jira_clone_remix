import { useCallback, useMemo, useState } from "react";
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
import { User } from "@domain/user";

export const TableView = ({
  show = true,
}: TooltipProps): JSX.Element => {
  const getServerSideDatasource: (server: any) => IServerSideDatasource = (
    server: any
  ) => {
    return {
      getRows: async (params) => {
        console.log('[Datasource] - rows requested by grid: ', params.request);
        const response = await server(params.request.startRow, params.request.endRow);
        console.log(response);
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

  const containerStyle = useMemo(() => ({ width: '100%', height: '500px' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'id', maxWidth: 75, sortable: true },
    { field: 'title', minWidth: 190, sortable: true },
    { field: 'price' },
    { field: 'description' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 90,
      resizable: true,
    };
  }, []);

  const getData = async (skip: number, limit: number) => {
    // const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price`)
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
    const data = await response.json()
    return data;
  }

  const onGridReady = useCallback(async (params: GridReadyEvent) => {
    // fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
    //   .then((resp) => resp.json())
    //   .then((data: ResponseData<IOlympicData[]>) => {
    //     // add id to data
    //     console.log(data)

    //     // // setup the fake server with entire dataset
    //     // const fakeServer = new FakeServer(data);
    //     // // create datasource with a reference to the fake server
    //     const datasource = getServerSideDatasource(data);
    //     // // register the datasource with the grid
    //     params.api!.setServerSideDatasource(datasource);
    //   });
    const datasource = getServerSideDatasource(getData);
    params.api!.setServerSideDatasource(datasource);
  }, []);


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
                columnDefs={columnDefs}
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