/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseFilter } from "./BaseFilter";

export type ExportProductsRequest = BaseFilter & {
  brandId?: string | null;
  minimumRate?: number | null;
  maximumRate?: number | null;
};

