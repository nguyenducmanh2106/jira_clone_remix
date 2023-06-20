import React, { useEffect, useRef, useState } from 'react';
import { ColDef, IHeaderParams } from 'ag-grid-community';
import * as Popover from '@radix-ui/react-popover';
// import ReactPortal from '../portal';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  GearIcon,
} from '@radix-ui/react-icons';
import { RiFilterLine, RiCloseLine } from "react-icons/ri";
import { CheckedState } from '@radix-ui/react-checkbox';
import { Button } from '../../Button/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../../Sheet';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GroupAllField } from './GroupAllField/ListColumns';
import cx from "classix";
import { Input } from '../../Input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog';
import { ListColumnDrag } from './GroupSelectedField/ListColumDrag';
export interface ICustomHeaderParams extends IHeaderParams {
  menuIcon: string;
  checkboxSelection: boolean,
  columnGrids: ColDef[]
}

export const SettingColumn = (props: ICustomHeaderParams): JSX.Element => {
  // console.log(props)
  // const columns = props.columnApi.getColumnState();
  // const allColumns = props.api.getColumnDefs()?.filter((column: ColDef) => (column.headerName as string)) as ColDef[];
  // const columnDisplayings = props.api.getColumnDefs()?.filter((column: ColDef) => (column.headerName as string) && (!column.hide)) as ColDef[];
  const [isChange, setIsChange] = useState<boolean>(false)
  const [allColumns, setAllColumns] = useState<ColDef[]>(props.columnGrids)
  const [columnDisplayings, setColumnDisplayings] = useState<ColDef[]>(() => {
    return props.api.getColumnDefs()?.filter((column: ColDef) => (column.headerName as string) && (!column.hide)) as ColDef[];
  })
  const toggleDisplayColumns = (column: ColDef) => {
    // props.columnApi.applyColumnState({
    //   state: [
    //     { colId: 'title', hide: true },
    //   ],
    // })
    const indexColumn = columnDisplayings.findIndex(columnItem => columnItem.colId === column.colId);
    const endIndex = columnDisplayings.length;
    const result = Array.from(columnDisplayings);
    const resultAllColumns = Array.from(allColumns);

    if (!column.hide) {
      result.splice(endIndex, 0, column);
      console.log("hiển thị")
    }
    else {
      const [removed] = result.splice(indexColumn, 1);

      // result.splice(endIndex, 0, removed);
      console.log("bị ẩn")
      setIsChange(true)
    }
    const indexColumnInAllColumn = resultAllColumns.findIndex(columnItem => columnItem.colId === column.colId);
    resultAllColumns.splice(indexColumnInAllColumn, 1, column);
    setAllColumns(resultAllColumns)
    setColumnDisplayings(result);
  }


  return (
    // <Dialog>
    //   <DialogTrigger>
    //     <div className='cursor-pointer'>
    //       <GearIcon />
    //     </div>
    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>Are you sure absolutely sure?</DialogTitle>
    //       <DialogDescription>
    //         This action cannot be undone. This will permanently delete your account
    //         and remove your data from our servers.
    //       </DialogDescription>
    //     </DialogHeader>
    //     <div className={cx(
    //       "grid gap-4 py-4 overflow-y-auto flex setting-column my-[8px]",

    //     )} >
    //       <DndProvider backend={HTML5Backend}>
    //         <ListColumnDrag />
    //       </DndProvider>
    //     </div>
    //     <DialogFooter>
    //       <Button type="submit">Save changes</Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
    <Sheet>
      <SheetTrigger asChild>
        <div className='cursor-pointer'>
          <GearIcon />
        </div>
      </SheetTrigger>
      <SheetContent position="right" className='p-0 w-[600px]'>
        <SheetHeader className='p-[8px]'>
          <SheetTitle>Tùy chỉnh cột</SheetTitle>
        </SheetHeader>
        <div className={cx(
          "grid grid-cols-2 gap-4 border-b overflow-y-auto setting-column my-[8px]",

        )} >
          <GroupAllField columns={allColumns} toggleDisplayColumns={toggleDisplayColumns} isChange={isChange} />
          <ListColumnDrag columns={columnDisplayings} toggleDisplayColumns={toggleDisplayColumns} />
        </div>
        <SheetFooter className='pr-[16px]'>
          <SheetClose asChild>
            <Button variant="outline">Hủy</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit">Lưu</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
