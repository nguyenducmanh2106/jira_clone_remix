import React, { useEffect, useRef, useState } from 'react';
import { IHeaderParams, INoRowsOverlayParams } from 'ag-grid-community';
import { Dropdown } from "flowbite-react";
// import ReactPortal from '../portal';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from '@radix-ui/react-icons';

export interface INoRowsOverlay extends INoRowsOverlayParams {
  noRowsMessageFunc: () => string;
}

export const NoRowsOverlay = (props: INoRowsOverlay): JSX.Element => {
  return (
    <div className='customHeader flex items-center'>
      <div
        className="ag-overlay-loading-center"
        style={{ backgroundColor: 'lightcoral', height: '9%' }}
      >
        {props.noRowsMessageFunc()}
      </div>
    </div >
  );
};
