/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorResult } from "../models/ErrorResult";
import type { StatsDto } from "../models/StatsDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * Get statistics for the dashboard.
 * @returns StatsDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const dashboardGet = (): CancelablePromise<StatsDto | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/v1/dashboard`,
  });
};

export const useDashboardGetService = (
  options: UseRequestOption
): {
  run: () => void;
  data: StatsDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(dashboardGet, options);
};

