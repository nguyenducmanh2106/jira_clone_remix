/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseFilter } from "./BaseFilter";

export type ExportFieldRequest = BaseFilter & {
  docTypeId?: string | null;
  minimumRate?: number | null;
  maximumRate?: number | null;
};

