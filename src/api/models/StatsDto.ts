/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChartSeries } from "./ChartSeries";

export type StatsDto = {
  productCount?: number;
  brandCount?: number;
  userCount?: number;
  roleCount?: number;
  dataEnterBarChart?: Array<ChartSeries>;
  productByBrandTypePieChart?: Record<string, number> | null;
};

