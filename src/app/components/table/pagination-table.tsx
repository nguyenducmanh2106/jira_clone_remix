import React, { useEffect, useRef, useState } from 'react';
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

export interface INoRowsOverlay {
  noRowsMessageFunc: string;
}
const SelectDemo = () => (
  <Select.Root>
    <Select.Trigger
      className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
      aria-label="Food"
    >
      <Select.Value placeholder="Select a fruit…" />
      <Select.Icon className="text-violet11">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group>
            <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
              Fruits
            </Select.Label>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </Select.Group>

          <Select.Separator className="h-[1px] bg-violet6 m-[5px]" />

          <Select.Group>
            <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
              Vegetables
            </Select.Label>
            <SelectItem value="aubergine">Aubergine</SelectItem>
            <SelectItem value="broccoli">Broccoli</SelectItem>
            <SelectItem value="carrot" disabled>
              Carrot
            </SelectItem>
            <SelectItem value="courgette">Courgette</SelectItem>
            <SelectItem value="leek">Leek</SelectItem>
          </Select.Group>

          <Select.Separator className="h-[1px] bg-violet6 m-[5px]" />

          <Select.Group>
            <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
              Meat
            </Select.Label>
            <SelectItem value="beef">Beef</SelectItem>
            <SelectItem value="chicken">Chicken</SelectItem>
            <SelectItem value="lamb">Lamb</SelectItem>
            <SelectItem value="pork">Pork</SelectItem>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

// eslint-disable-next-line react/display-name, react/prop-types
const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef): JSX.Element => {
  return (
    <Select.Item
      className={classnames(
        'text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export const PaginationTable = (props: INoRowsOverlay): JSX.Element => {

  return (
    <div className="whitespace-nowrap border-solid border-x border-y border-t-0 border-indigo-600 dark:border-white bg-white py-[12px] px-[16px] text-2xs text-bla dark:bg-dark-500 dark:text-white">
      <div className="flex items-center justify-between">
        <div className="left-pagination hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Tổng số:
              <span className="font-medium pl-[4px]">100</span>
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

            </nav>
          </div>
        </div>
        <div className="right-pagination hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Tổng số:
              <span className="font-medium pl-[4px]">100</span>
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
