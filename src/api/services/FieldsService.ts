/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFieldRequest } from "../models/CreateFieldRequest";
import type { ErrorResult } from "../models/ErrorResult";
import type { ExportFieldRequest } from "../models/ExportFieldRequest";
import type { FieldDetailsDto } from "../models/FieldDetailsDto";
import type { FieldDto } from "../models/FieldDto";
import type { PaginationResponseOfFieldDto } from "../models/PaginationResponseOfFieldDto";
import type { SearchFieldRequest } from "../models/SearchFieldRequest";
import type { UpdateFieldRequest } from "../models/UpdateFieldRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * Search fields using available filters.
 * @param requestBody
 * @returns PaginationResponseOfFieldDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const fieldsSearch = (
  requestBody: SearchFieldRequest
): CancelablePromise<PaginationResponseOfFieldDto | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/v1/fields/search`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Get field details.
 * @param id
 * @returns FieldDetailsDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const fieldsGet = (
  id: string
): CancelablePromise<FieldDetailsDto | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/v1/fields/${id}`,
  });
};

/**
 * Update a field.
 * @param id
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const fieldsUpdate = (
  id: string,
  requestBody: UpdateFieldRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "PUT",
    path: `/api/v1/fields/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Delete a field.
 * @param id
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const fieldsDelete = (
  id: string
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "DELETE",
    path: `/api/v1/fields/${id}`,
  });
};

/**
 * Get field details via dapper.
 * @param id
 * @returns FieldDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const fieldsGetDapper = (
  id?: string
): CancelablePromise<FieldDto | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/v1/fields/dapper`,
    query: {
      id: id,
    },
  });
};

/**
 * Create a new field.
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const fieldsCreate = (
  requestBody: CreateFieldRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/v1/fields`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Export a field.
 * @param requestBody
 * @returns binary
 * @throws ApiError
 */
export const fieldsExport = (
  requestBody: ExportFieldRequest
): CancelablePromise<Blob> => {
  return __request({
    method: "POST",
    path: `/api/v1/fields/export`,
    body: requestBody,
    mediaType: "application/json",
  });
};

export const useFieldsSearchService = (
  options: UseRequestOption
): {
  run: (requestBody: SearchFieldRequest) => void;
  data: PaginationResponseOfFieldDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(fieldsSearch, options);
};

export const useFieldsGetService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: FieldDetailsDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(fieldsGet, options);
};

export const useFieldsUpdateService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody: UpdateFieldRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(fieldsUpdate, options);
};

export const useFieldsDeleteService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(fieldsDelete, options);
};

export const useFieldsGetDapperService = (
  options: UseRequestOption
): {
  run: (id?: string) => void;
  data: FieldDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(fieldsGetDapper, options);
};

export const useFieldsCreateService = (
  options: UseRequestOption
): {
  run: (requestBody: CreateFieldRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(fieldsCreate, options);
};

export const useFieldsExportService = (
  options: UseRequestOption
): {
  run: (requestBody: ExportFieldRequest) => void;
  data: Blob;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(fieldsExport, options);
};

