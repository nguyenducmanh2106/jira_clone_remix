/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserRequest } from "../models/CreateUserRequest";
import type { ErrorResult } from "../models/ErrorResult";
import type { ForgotPasswordRequest } from "../models/ForgotPasswordRequest";
import type { ResetPasswordRequest } from "../models/ResetPasswordRequest";
import type { ToggleUserStatusRequest } from "../models/ToggleUserStatusRequest";
import type { UserDetailsDto } from "../models/UserDetailsDto";
import type { UserRoleDto } from "../models/UserRoleDto";
import type { UserRolesRequest } from "../models/UserRolesRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * Get list of all users.
 * @returns UserDetailsDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const usersGetList = (): CancelablePromise<
  Array<UserDetailsDto> | ErrorResult
> => {
  return __request({
    method: "GET",
    path: `/api/users`,
  });
};

/**
 * Creates a new user.
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const usersCreate = (
  requestBody: CreateUserRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/users`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Get a user's details.
 * @param id
 * @returns UserDetailsDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const usersGetById = (
  id: string | null
): CancelablePromise<UserDetailsDto | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/users/${id}`,
  });
};

/**
 * Get a user's roles.
 * @param id
 * @returns UserRoleDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const usersGetRoles = (
  id: string | null
): CancelablePromise<Array<UserRoleDto> | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/users/${id}/roles`,
  });
};

/**
 * Update a user's assigned roles.
 * @param id
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const usersAssignRoles = (
  id: string | null,
  requestBody: UserRolesRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/users/${id}/roles`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Anonymous user creates a user.
 * @param requestBody
 * @param tenant Input your tenant Id to access this API
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const usersSelfRegister = (
  requestBody: CreateUserRequest,
  tenant: string = ""
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/users/self-register`,
    headers: {
      tenant: tenant,
    },
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Toggle a user's active status.
 * @param id
 * @param requestBody
 * @returns any
 * @returns ErrorResult
 * @throws ApiError
 */
export const usersToggleStatus = (
  id: string | null,
  requestBody: ToggleUserStatusRequest
): CancelablePromise<any | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/users/${id}/toggle-status`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Confirm email address for a user.
 * @param tenant
 * @param userId
 * @param code
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const usersConfirmEmail = (
  tenant?: string | null,
  userId?: string | null,
  code?: string | null
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/users/confirm-email`,
    query: {
      tenant: tenant,
      userId: userId,
      code: code,
    },
  });
};

/**
 * Confirm phone number for a user.
 * @param userId
 * @param code
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const usersConfirmPhoneNumber = (
  userId?: string | null,
  code?: string | null
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "GET",
    path: `/api/users/confirm-phone-number`,
    query: {
      userId: userId,
      code: code,
    },
  });
};

/**
 * Request a password reset email for a user.
 * @param requestBody
 * @param tenant Input your tenant Id to access this API
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const usersForgotPassword = (
  requestBody: ForgotPasswordRequest,
  tenant: string = ""
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/users/forgot-password`,
    headers: {
      tenant: tenant,
    },
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Reset a user's password.
 * @param requestBody
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const usersResetPassword = (
  requestBody: ResetPasswordRequest
): CancelablePromise<string | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/users/reset-password`,
    body: requestBody,
    mediaType: "application/json",
  });
};

export const useUsersGetListService = (
  options: UseRequestOption
): {
  run: () => void;
  data: Array<UserDetailsDto> | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(usersGetList, options);
};

export const useUsersCreateService = (
  options: UseRequestOption
): {
  run: (requestBody: CreateUserRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(usersCreate, options);
};

export const useUsersGetByIdService = (
  options: UseRequestOption
): {
  run: (id: string | null) => void;
  data: UserDetailsDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(usersGetById, options);
};

export const useUsersGetRolesService = (
  options: UseRequestOption
): {
  run: (id: string | null) => void;
  data: Array<UserRoleDto> | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(usersGetRoles, options);
};

export const useUsersAssignRolesService = (
  options: UseRequestOption
): {
  run: (id: string | null, requestBody: UserRolesRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(usersAssignRoles, options);
};

export const useUsersSelfRegisterService = (
  options: UseRequestOption
): {
  run: (requestBody: CreateUserRequest, tenant: string = "") => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(usersSelfRegister, options);
};

export const useUsersToggleStatusService = (
  options: UseRequestOption
): {
  run: (id: string | null, requestBody: ToggleUserStatusRequest) => void;
  data: any | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(usersToggleStatus, options);
};

export const useUsersConfirmEmailService = (
  options: UseRequestOption
): {
  run: (
    tenant?: string | null,
    userId?: string | null,
    code?: string | null
  ) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(usersConfirmEmail, options);
};

export const useUsersConfirmPhoneNumberService = (
  options: UseRequestOption
): {
  run: (userId?: string | null, code?: string | null) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(usersConfirmPhoneNumber, options);
};

export const useUsersForgotPasswordService = (
  options: UseRequestOption
): {
  run: (requestBody: ForgotPasswordRequest, tenant: string = "") => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(usersForgotPassword, options);
};

export const useUsersResetPasswordService = (
  options: UseRequestOption
): {
  run: (requestBody: ResetPasswordRequest) => void;
  data: string | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(usersResetPassword, options);
};

