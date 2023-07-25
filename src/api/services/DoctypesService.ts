/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDoctypeRequest } from "../models/CreateDoctypeRequest";
import type { DoctypeDto } from "../models/DoctypeDto";
import type { ErrorResult } from "../models/ErrorResult";
import type { GenerateRandomDoctypeRequest } from "../models/GenerateRandomDoctypeRequest";
import type { PaginationResponseOfDoctypeDto } from "../models/PaginationResponseOfDoctypeDto";
import type { SearchDoctypeRequest } from "../models/SearchDoctypeRequest";
import type { UpdateDoctypeRequest } from "../models/UpdateDoctypeRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * Search doctypes using available filters.
 * @param requestBody
 * @returns PaginationResponseOfDoctypeDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const doctypesSearch = (
  requestBody: SearchDoctypeRequest
): CancelablePromise<PaginationResponseOfDoctypeDto | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/v1/doctypes/search`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Get doctype details.
 * @param id
 * @returns DoctypeDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const doctypesGet = (
  id: string
): CancelablePromise<DoctypeDto | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/v1/doctypes/${id}`,
  });
};

/**
 * Update a doctype.
 * @param id
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const doctypesUpdate = (
  id: string,
  requestBody: UpdateDoctypeRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "PUT",
    path: `/api/v1/doctypes/${id}`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Delete a doctype.
 * @param id
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const doctypesDelete = (
  id: string
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "DELETE",
    path: `/api/v1/doctypes/${id}`,
  });
};

/**
 * Create a new doctype.
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const doctypesCreate = (
  requestBody: CreateDoctypeRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/v1/doctypes`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Generate a number of random doctypes.
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const doctypesGenerateRandom = (
  requestBody: GenerateRandomDoctypeRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/v1/doctypes/generate-random`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Delete the doctypes generated with the generate-random call.
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const doctypesDeleteRandom = (): CancelablePromise<
  string | ErrorResult
> => {
  return __request({
    method: "DELETE",
    path: `/api/v1/doctypes/delete-random`,
  });
};

export const useDoctypesSearchService = (
  options: UseRequestOption
): {
  run: (requestBody: SearchDoctypeRequest) => void;
  data: PaginationResponseOfDoctypeDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(doctypesSearch, options);
};

export const useDoctypesGetService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: DoctypeDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(doctypesGet, options);
};

export const useDoctypesUpdateService = (
  options: UseRequestOption
): {
  run: (id: string, requestBody: UpdateDoctypeRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(doctypesUpdate, options);
};

export const useDoctypesDeleteService = (
  options: UseRequestOption
): {
  run: (id: string) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(doctypesDelete, options);
};

export const useDoctypesCreateService = (
  options: UseRequestOption
): {
  run: (requestBody: CreateDoctypeRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(doctypesCreate, options);
};

export const useDoctypesGenerateRandomService = (
  options: UseRequestOption
): {
  run: (requestBody: GenerateRandomDoctypeRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(doctypesGenerateRandom, options);
};

export const useDoctypesDeleteRandomService = (
  options: UseRequestOption
): {
  run: () => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(doctypesDeleteRandom, options);
};

