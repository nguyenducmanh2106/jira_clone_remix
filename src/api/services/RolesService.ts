/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrUpdateRoleRequest } from "../models/CreateOrUpdateRoleRequest";
import type { ErrorResult } from "../models/ErrorResult";
import type { RoleDto } from "../models/RoleDto";
import type { UpdateRolePermissionsRequest } from "../models/UpdateRolePermissionsRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * Get a list of all roles.
 * @returns RoleDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const rolesGetList = (): CancelablePromise<
  Array<RoleDto> | ErrorResult
> => {
  return __request({
    method: "GET",
    path: `/api/roles`,
  });
};

/**
 * Create or update a role.
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const rolesRegisterRole = (
  requestBody: CreateOrUpdateRoleRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/roles`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Get role details.
 * @param id
 * @returns RoleDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const rolesGetById = (
  id: string | null
): CancelablePromise<RoleDto | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/roles/${id}`,
  });
};

/**
 * Delete a role.
 * @param id
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const rolesDelete = (
  id: string | null
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "DELETE",
    path: `/api/roles/${id}`,
  });
};

/**
 * Get role details with its permissions.
 * @param id
 * @returns RoleDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const rolesGetByIdWithPermissions = (
  id: string | null
): CancelablePromise<RoleDto | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/roles/${id}/permissions`,
  });
};

/**
 * Update a role's permissions.
 * @param id
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const rolesUpdatePermissions = (
  id: string | null,
  requestBody: UpdateRolePermissionsRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "PUT",
    path: `/api/roles/${id}/permissions`,
    body: requestBody,
    mediaType: "application/json",
  });
};

export const useRolesGetListService = (
  options: UseRequestOption
): {
  run: () => void;
  data: Array<RoleDto> | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(rolesGetList, options);
};

export const useRolesRegisterRoleService = (
  options: UseRequestOption
): {
  run: (requestBody: CreateOrUpdateRoleRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(rolesRegisterRole, options);
};

export const useRolesGetByIdService = (
  options: UseRequestOption
): {
  run: (id: string | null) => void;
  data: RoleDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(rolesGetById, options);
};

export const useRolesDeleteService = (
  options: UseRequestOption
): {
  run: (id: string | null) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(rolesDelete, options);
};

export const useRolesGetByIdWithPermissionsService = (
  options: UseRequestOption
): {
  run: (id: string | null) => void;
  data: RoleDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(rolesGetByIdWithPermissions, options);
};

export const useRolesUpdatePermissionsService = (
  options: UseRequestOption
): {
  run: (id: string | null, requestBody: UpdateRolePermissionsRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(rolesUpdatePermissions, options);
};

