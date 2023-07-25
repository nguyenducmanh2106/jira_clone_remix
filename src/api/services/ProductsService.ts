/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductRequest } from "../models/CreateProductRequest";
import type { ErrorResult } from "../models/ErrorResult";
import type { ExportProductsRequest } from "../models/ExportProductsRequest";
import type { PaginationResponseOfProductDto } from "../models/PaginationResponseOfProductDto";
import type { ProductDetailsDto } from "../models/ProductDetailsDto";
import type { ProductDto } from "../models/ProductDto";
import type { SearchProductsRequest } from "../models/SearchProductsRequest";
import type { UpdateProductRequest } from "../models/UpdateProductRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * Search products using available filters.
 * @param requestBody
 * @returns PaginationResponseOfProductDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const productsSearch = (
  requestBody: SearchProductsRequest
): CancelablePromise<PaginationResponseOfProductDto | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/v1/products/search`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Get product details.
 * @param id
 * @returns ProductDetailsDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const productsGet = (
  id: string
): CancelablePromise<ProductDetailsDto | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/v1/products/${id}`,
  });
};

/**
 * Update a product.
 * @param id
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const productsUpdate = (
  id: string,
  requestBody: UpdateProductRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "PUT",
    path: `/api/v1/products/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Delete a product.
 * @param id
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const productsDelete = (
  id: string
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "DELETE",
    path: `/api/v1/products/${id}`,
  });
};

/**
 * Get product details via dapper.
 * @param id
 * @returns ProductDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const productsGetDapper = (
  id?: string
): CancelablePromise<ProductDto | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/v1/products/dapper`,
    query: {
      id: id,
    },
  });
};

/**
 * Create a new product.
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const productsCreate = (
  requestBody: CreateProductRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/v1/products`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Export a products.
 * @param requestBody
 * @returns binary
 * @throws ApiError
 */
export const productsExport = (
  requestBody: ExportProductsRequest
): CancelablePromise<Blob> => {
  return __request({
    method: "POST",
    path: `/api/v1/products/export`,
    body: requestBody,
    mediaType: "application/json",
  });
};

export const useProductsSearchService = (
  options: UseRequestOption
): {
  run: (requestBody: SearchProductsRequest) => void;
  data: PaginationResponseOfProductDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(productsSearch, options);
};

export const useProductsGetService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: ProductDetailsDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(productsGet, options);
};

export const useProductsUpdateService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody: UpdateProductRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(productsUpdate, options);
};

export const useProductsDeleteService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(productsDelete, options);
};

export const useProductsGetDapperService = (
  options: UseRequestOption
): {
  run: (id?: string) => void;
  data: ProductDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(productsGetDapper, options);
};

export const useProductsCreateService = (
  options: UseRequestOption
): {
  run: (requestBody: CreateProductRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(productsCreate, options);
};

export const useProductsExportService = (
  options: UseRequestOption
): {
  run: (requestBody: ExportProductsRequest) => void;
  data: Blob;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(productsExport, options);
};

