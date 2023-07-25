/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Filter = {
  logic?: string | null;
  filters?: Array<Filter> | null;
  field?: string | null;
  operator?: string | null;
  value?: any;
};

