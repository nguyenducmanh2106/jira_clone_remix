/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTenantRequest } from "../models/CreateTenantRequest";
import type { ErrorResult } from "../models/ErrorResult";
import type { TenantDto } from "../models/TenantDto";
import type { UpgradeSubscriptionRequest } from "../models/UpgradeSubscriptionRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * Get a list of all tenants.
 * @returns TenantDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const tenantsGetList = (): CancelablePromise<
  Array<TenantDto> | ErrorResult
> => {
  return __request({
    method: "GET",
    path: `/api/tenants`,
  });
};

/**
 * Create a new tenant.
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const tenantsCreate = (
  requestBody: CreateTenantRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/tenants`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Get tenant details.
 * @param id
 * @returns TenantDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const tenantsGet = (
  id: string | null
): CancelablePromise<TenantDto | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/tenants/${id}`,
  });
};

/**
 * Activate a tenant.
 * @param id
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const tenantsActivate = (
  id: string | null
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/tenants/${id}/activate`,
  });
};

/**
 * Deactivate a tenant.
 * @param id
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const tenantsDeactivate = (
  id: string | null
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/tenants/${id}/deactivate`,
  });
};

/**
 * Upgrade a tenant's subscription.
 * @param id
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const tenantsUpgradeSubscription = (
  id: string | null,
  requestBody: UpgradeSubscriptionRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/tenants/${id}/upgrade`,
    body: requestBody,
    mediaType: "application/json",
  });
};

export const useTenantsGetListService = (
  options: UseRequestOption
): {
  run: () => void;
  data: Array<TenantDto> | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(tenantsGetList, options);
};

export const useTenantsCreateService = (
  options: UseRequestOption
): {
  run: (requestBody: CreateTenantRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(tenantsCreate, options);
};

export const useTenantsGetService = (
  options: UseRequestOption
): {
  run: (id: string | null) => void;
  data: TenantDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(tenantsGet, options);
};

export const useTenantsActivateService = (
  options: UseRequestOption
): {
  run: (id: string | null) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(tenantsActivate, options);
};

export const useTenantsDeactivateService = (
  options: UseRequestOption
): {
  run: (id: string | null) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(tenantsDeactivate, options);
};

export const useTenantsUpgradeSubscriptionService = (
  options: UseRequestOption
): {
  run: (id: string | null, requestBody: UpgradeSubscriptionRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(tenantsUpgradeSubscription, options);
};

