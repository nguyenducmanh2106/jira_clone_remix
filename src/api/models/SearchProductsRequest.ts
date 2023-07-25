/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaginationFilter } from "./PaginationFilter";

export type SearchProductsRequest = PaginationFilter & {
  brandId?: string | null;
  minimumRate?: number | null;
  maximumRate?: number | null;
};

