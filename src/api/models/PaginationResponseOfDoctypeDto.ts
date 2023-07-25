/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DoctypeDto } from "./DoctypeDto";

export type PaginationResponseOfDoctypeDto = {
  data?: Array<DoctypeDto>;
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  pageSize?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};

