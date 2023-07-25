/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationFilter } from "./PaginationFilter";

export type SearchFieldRequest = PaginationFilter & {
  docTypeId?: string | null;
};

