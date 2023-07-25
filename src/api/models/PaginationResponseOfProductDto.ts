/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductDto } from "./ProductDto";

export type PaginationResponseOfProductDto = {
  data?: Array<ProductDto>;
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  pageSize?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};

