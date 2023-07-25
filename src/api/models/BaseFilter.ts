/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Filter } from "./Filter";
import type { Search } from "./Search";

export type BaseFilter = {
  /**
   * Column Wise Search is Supported.
   */
  advancedSearch?: Search | null;
  /**
   * Keyword to Search in All the available columns of the Resource.
   */
  keyword?: string | null;
  /**
   * Advanced column filtering with logical operators and query operators is supported.
   */
  advancedFilter?: Filter | null;
};

