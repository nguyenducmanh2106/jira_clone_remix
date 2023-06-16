import React, { useEffect, useRef, useState } from 'react';
import { IHeaderParams } from 'ag-grid-community';
import * as Popover from '@radix-ui/react-popover';
// import ReactPortal from '../portal';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  GearIcon,
} from '@radix-ui/react-icons';
import { RiFilterLine, RiCloseLine } from "react-icons/ri";
import { CheckedState } from '@radix-ui/react-checkbox';
import { Button } from '../Button/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../Sheet';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SortableColumn } from './SettingColumn/SortTableColumn';
import cx from "classix";
import { Input } from '../Input';
import { ListColumnDrag } from './SettingColumns/ListColumDrag';

export interface ICustomHeaderParams extends IHeaderParams {
  menuIcon: string;
  checkboxSelection: boolean
}

export const SettingColumn = (props: ICustomHeaderParams): JSX.Element => {


  // useEffect(() => {

  // }, []);

  return (

    <Sheet>
      <SheetTrigger asChild>
        <div className='cursor-pointer'>
          <GearIcon />
        </div>
      </SheetTrigger>
      <SheetContent position="right" size="sm">
        <SheetHeader>
          <SheetTitle>Tùy chỉnh cột</SheetTitle>
          <SheetDescription>
            <Input />
          </SheetDescription>
        </SheetHeader>
        <div className={cx(
          "grid gap-4 py-4 overflow-y-auto flex setting-column my-[8px]",

        )} >
          {/* <DndProvider backend={HTML5Backend}>
            <SortableColumn />
          </DndProvider> */}
          <ListColumnDrag />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Hủy</Button>
          </SheetClose>
          <SheetClose asChild>
            {/* <Button variant="outline">Hủy</Button> */}
            <Button type="submit">Lưu</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
