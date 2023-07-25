/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BrandDto } from "../models/BrandDto";
import type { CreateBrandRequest } from "../models/CreateBrandRequest";
import type { ErrorResult } from "../models/ErrorResult";
import type { GenerateRandomBrandRequest } from "../models/GenerateRandomBrandRequest";
import type { PaginationResponseOfBrandDto } from "../models/PaginationResponseOfBrandDto";
import type { SearchBrandsRequest } from "../models/SearchBrandsRequest";
import type { UpdateBrandRequest } from "../models/UpdateBrandRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * Search brands using available filters.
 * @param requestBody
 * @returns PaginationResponseOfBrandDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const brandsSearch = (
  requestBody: SearchBrandsRequest
): CancelablePromise<PaginationResponseOfBrandDto | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/v1/brands/search`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Get brand details.
 * @param id
 * @returns BrandDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const brandsGet = (
  id: string
): CancelablePromise<BrandDto | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/v1/brands/${id}`,
  });
};

/**
 * Update a brand.
 * @param id
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const brandsUpdate = (
  id: string,
  requestBody: UpdateBrandRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "PUT",
    path: `/api/v1/brands/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Delete a brand.
 * @param id
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const brandsDelete = (
  id: string
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "DELETE",
    path: `/api/v1/brands/${id}`,
  });
};

/**
 * Create a new brand.
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const brandsCreate = (
  requestBody: CreateBrandRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/v1/brands`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Generate a number of random brands.
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const brandsGenerateRandom = (
  requestBody: GenerateRandomBrandRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/v1/brands/generate-random`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Delete the brands generated with the generate-random call.
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const brandsDeleteRandom = (): CancelablePromise<
  string | ErrorResult
> => {
  return __request({
    method: "DELETE",
    path: `/api/v1/brands/delete-random`,
  });
};

export const useBrandsSearchService = (
  options: UseRequestOption
): {
  run: (requestBody: SearchBrandsRequest) => void;
  data: PaginationResponseOfBrandDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(brandsSearch, options);
};

export const useBrandsGetService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: BrandDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(brandsGet, options);
};

export const useBrandsUpdateService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody: UpdateBrandRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(brandsUpdate, options);
};

export const useBrandsDeleteService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(brandsDelete, options);
};

export const useBrandsCreateService = (
  options: UseRequestOption
): {
  run: (requestBody: CreateBrandRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(brandsCreate, options);
};

export const useBrandsGenerateRandomService = (
  options: UseRequestOption
): {
  run: (requestBody: GenerateRandomBrandRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(brandsGenerateRandom, options);
};

export const useBrandsDeleteRandomService = (
  options: UseRequestOption
): {
  run: () => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(brandsDeleteRandom, options);
};

