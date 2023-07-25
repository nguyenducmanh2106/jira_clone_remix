/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FieldDto } from "./FieldDto";

export type PaginationResponseOfFieldDto = {
  data?: Array<FieldDto>;
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  pageSize?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};

