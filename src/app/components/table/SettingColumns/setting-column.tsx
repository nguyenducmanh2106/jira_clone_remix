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
  checkboxSelection: boolean
}

export const SettingColumn = (props: ICustomHeaderParams): JSX.Element => {
  // const columns = props.columnApi.getColumnState();
  const columns = props.api.getColumnDefs()?.filter((column: ColDef) => (column.headerName as string)) as ColDef[];

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
      <SheetContent position="right" size="lg">
        <SheetHeader>
          <SheetTitle>Tùy chỉnh cột</SheetTitle>
        </SheetHeader>
        <div className={cx(
          "grid grid-cols-2 gap-4 py-4 overflow-y-auto setting-column my-[8px]",

        )} >
          <GroupAllField columns={columns} />
          <ListColumnDrag columns={columns} />
        </div>
        <SheetFooter>
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
