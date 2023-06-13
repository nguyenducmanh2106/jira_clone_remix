import { useCallback, useMemo, useRef, useState } from "react";
import cx from "classix";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import {
  ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  Grid,
  GridReadyEvent,
  IServerSideDatasource,
  RowModelType,
  SideBarDef,
  StatusPanelDef,
} from 'ag-grid-community';
import { HeaderTableView } from "./header";
import { NoRowsOverlay } from "./no-rows-overlay";
import { CellComponentTableView } from "./cell-render";
import { PaginationTableRight } from "./pagination-table-right";
import {
  GearIcon, DragHandleDots2Icon
} from '@radix-ui/react-icons';
import { SettingColumn } from "./setting-column";
import { AG_GRID_LOCALE } from "@/src/app/localization/locale"
import { PaginationTableLeft } from "./pagination-table-left";
// declare const AG_GRID_LOCALE: {
//   [key: string]: string;
// };
export const TableView = ({
  show = true,
}: TooltipProps): JSX.Element => {

  const gridRef = useRef<AgGridReact<IOlympicData>>(null);

  const gridContainerRef = useRef(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '500px' }), []);
  // let [containerStyle, setContainerStyle] = useState({ width: '100%', height: '500px' });
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const defaultPageSize = 20 as number;
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(false);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // { field: 'id', maxWidth: 75, sortable: true },
    // { field: 'title', minWidth: 190, sortable: true },
    // { field: 'price' },
    // { field: 'description' },
  ]);

  const localeText = useMemo<{
    [key: string]: string;
  }>(() => {
    return AG_GRID_LOCALE;
  }, []);
  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current!.api.getSelectedRows();
    // console.log(selectedRows)
    // let selectedRowsString = '';
    // const maxToShow = 5;
    // selectedRows.forEach(function (selectedRow, index) {
    //   if (index >= maxToShow) {
    //     return;
    //   }
    //   if (index > 0) {
    //     selectedRowsString += ', ';
    //   }
    //   selectedRowsString += selectedRow.athlete;
    // });
    // if (selectedRows.length > maxToShow) {
    //   const othersCount = selectedRows.length - maxToShow;
    //   selectedRowsString +=
    //     ' and ' + othersCount + ' other' + (othersCount !== 1 ? 's' : '');
    // }

  }, []);

  const onFirstDataRendered = useCallback(
    (params: FirstDataRenderedEvent<IOlympicData>) => {
      const selectedRows: IOlympicData | any = gridRef.current!.api.getSelectedRows();
      // gridRef.current!.api.forEachNode((node) =>
      //   node.setSelected(!!node.data && node.data.year === 2012)
      // );
    },
    []
  );
  const colDefsMedalsExcluded: (ColDef | ColGroupDef)[] = [
    {
      field: 'id',
      // headerName: 'Id1',
      maxWidth: 40,
      checkboxSelection: true,
      // defaultToolPanel: 'none',
      headerCheckboxSelection: true,
      headerComponentParams: {
        checkboxSelection: true,
        isColumnDefault: true,
      },
      pinned: true,
      resizable: false,
      suppressMovable: true,
      lockPosition: true,
      sortIndex: 0
      // cellRendererParams: {
      //   inputType: 'number',
      //   checkbox: true,
      // },
      // cellRenderer: CellComponentTableView,
    },
    // {
    //   field: 'id',
    //   headerName: 'Id',
    //   maxWidth: 175,
    // },
    {
      headerName: 'Athlete Details',
      sortIndex: 1,
      children: [
        {
          field: 'title',
          minWidth: 190,
          headerName: 'Tiêu đề',
          headerComponent: HeaderTableView,
          sortable: true,
        },
        {
          field: 'price',
          headerName: 'Giá',
          sortable: true,
          cellRendererParams: {
            inputType: 'number',
          },
          cellRenderer: CellComponentTableView,
        },
      ]
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      hide: true,
      headerComponent: HeaderTableView,
      cellRendererParams: {
        inputType: 'text',
      },
      cellRenderer: CellComponentTableView,
    },
    // {
    //   field: 'actions',
    //   headerComponent: SettingColumn,
    //   headerComponentParams: {
    //     isColumnDefault: true,
    //   },
    //   maxWidth: 40,
    //   pinned: "right",
    //   resizable: false,
    //   suppressMovable: true,
    //   lockPosition: true,
    // },
  ];
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 90,
      resizable: true,
      enableCellChangeFlash: true,
    };
  }, []);

  const components = useMemo<{
    [p: string]: any;
  }>(() => {
    return {
      // agColumnHeader: HeaderTableView,
    };
  }, []);

  const noRowsOverlayComponent = useMemo(() => {
    return NoRowsOverlay;
  }, []);

  const noRowsOverlayComponentParams = useMemo(() => {
    return {
      noRowsMessageFunc: () => 'Sorry - no rows! at: ' + new Date(),
    };
  }, []);


  const getServerSideDatasource: (server: (skip: number, limit: number) => Promise<any>) => IServerSideDatasource = (
    server: any
  ) => {
    return {
      getRows: async (params) => {
        console.log('[Datasource] - rows requested by grid: ', params.request);
        const skip = params.request.startRow ?? 0;
        const take = (params.request.endRow ?? 0) - (params.request.startRow ?? 0);
        const response = await server(skip, take);
        // console.log(response);
        // adding delay to simulate real server call
        setTimeout(function () {
          // if (response.success) {
          // eslint-disable-next-line no-constant-condition
          if (response && response.total) {
            setTotalRecords(response.total)

            // call the success callback
            params.success({
              rowData: response.products,
              rowCount: response.total,
              // rowData: [],
              // rowCount: 0
            });
          } else {
            // inform the grid request failed
            params.fail();
          }
        }, 0);
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

    // console.log(gridContainerRef?.current?.getBoundingClientRect())
    // const boundingClientRect = gridContainerRef?.current?.getBoundingClientRect();
    // // setContainerStyle({ ...containerStyle, height: `calc(100vh - ${boundingClientRect.top})` })
    // const heightTable = window.innerHeight - boundingClientRect.top
    // setContainerStyle({ ...containerStyle, height: `${heightTable}px` })
  }, []);

  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          maxWidth: 400,
          minWidth: 260,
          width: 260,
          toolPanelParams: {
            // prevents custom layout changing when columns are reordered in the grid
            // suppressSyncLayoutWithGrid: true,
            // // prevents columns being reordered from the columns tool panel
            // suppressColumnMove: true,
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivotMode: true
          },
        },
      ],
      position: 'left',
      // defaultToolPanel: 'columns',
    };
  }, []);
  const statusBar = useMemo<{
    statusPanels: StatusPanelDef[];
  }>(() => {
    return {
      statusPanels: [
        {
          statusPanel: PaginationTableLeft,
          align: 'left',
        },
        {
          statusPanel: PaginationTableRight,
          align: 'right',
          // statusPanelParams: {
          //   // possible values are: 'count', 'sum', 'min', 'max', 'avg'
          //   defaultPageSize: defaultPageSize
          // }
        },
      ],
    };
  }, []);

  return (
    <div className="relative">
      <div
        className={cx(
          "block"
        )}
      >
        {/* <div className="panel-table whitespace-nowrap rounded bg-font-main py-0.5 px-1.5 text-2xs text-white dark:bg-dark-500">
          <GearIcon />
        </div> */}
        <div className="tableViewContainer" ref={gridContainerRef}>
          <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-balham">
              <AgGridReact<IOlympicData>
                ref={gridRef}
                columnDefs={columnDefs}
                components={components}
                defaultColDef={defaultColDef}
                rowModelType={'serverSide'}
                pagination={true}
                sideBar={sideBar}
                statusBar={statusBar}
                localeText={localeText}
                suppressPaginationPanel={true}
                paginationPageSize={defaultPageSize}
                rowSelection={'multiple'}
                cacheBlockSize={defaultPageSize}
                animateRows={true}
                overlayNoRowsTemplate="noRowsTemplate"
                suppressRowClickSelection={true}
                onSelectionChanged={onSelectionChanged}
                onFirstDataRendered={onFirstDataRendered}
                // noRowsOverlayComponent={noRowsOverlayComponent}
                // noRowsOverlayComponentParams={noRowsOverlayComponentParams}
                onGridReady={onGridReady}
              ></AgGridReact>
              {/* <PaginationTable totalRecord={totalRecords} hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                gridRef={gridRef} defaultPageSize={defaultPageSize} noRowsMessageFunc={"hi"} /> */}
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