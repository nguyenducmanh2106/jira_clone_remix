/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseFilter } from "./BaseFilter";

export type PaginationFilter = BaseFilter & {
  pageNumber?: number;
  pageSize?: number;
  orderBy?: Array<string> | null;
};

