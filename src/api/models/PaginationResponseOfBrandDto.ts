/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BrandDto } from "./BrandDto";

export type PaginationResponseOfBrandDto = {
  data?: Array<BrandDto>;
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  pageSize?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};

