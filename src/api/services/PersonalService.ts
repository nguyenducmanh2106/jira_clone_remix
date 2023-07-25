/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuditDto } from "../models/AuditDto";
import type { ChangePasswordRequest } from "../models/ChangePasswordRequest";
import type { ErrorResult } from "../models/ErrorResult";
import type { UpdateUserRequest } from "../models/UpdateUserRequest";
import type { UserDetailsDto } from "../models/UserDetailsDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * Get profile details of currently logged in user.
 * @returns UserDetailsDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const personalGetProfile = (): CancelablePromise<
  UserDetailsDto | ErrorResult
> => {
  return __request({
    method: "GET",
    path: `/api/personal/profile`,
  });
};

/**
 * Update profile details of currently logged in user.
 * @param requestBody
 * @returns any
 * @returns ErrorResult
 * @throws ApiError
 */
export const personalUpdateProfile = (
  requestBody: UpdateUserRequest
): CancelablePromise<any | ErrorResult> => {
  return __request({
    method: "PUT",
    path: `/api/personal/profile`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Change password of currently logged in user.
 * @param requestBody
 * @returns any
 * @returns ErrorResult
 * @throws ApiError
 */
export const personalChangePassword = (
  requestBody: ChangePasswordRequest
): CancelablePromise<any | ErrorResult> => {
  return __request({
    method: "PUT",
    path: `/api/personal/change-password`,
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Get permissions of currently logged in user.
 * @returns string
 * @returns ErrorResult
 * @throws ApiError
 */
export const personalGetPermissions = (): CancelablePromise<
  Array<string> | ErrorResult
> => {
  return __request({
    method: "GET",
    path: `/api/personal/permissions`,
  });
};

/**
 * Get audit logs of currently logged in user.
 * @returns AuditDto
 * @returns ErrorResult
 * @throws ApiError
 */
export const personalGetLogs = (): CancelablePromise<
  Array<AuditDto> | ErrorResult
> => {
  return __request({
    method: "GET",
    path: `/api/personal/logs`,
  });
};

export const usePersonalGetProfileService = (
  options: UseRequestOption
): {
  run: () => void;
  data: UserDetailsDto | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(personalGetProfile, options);
};

export const usePersonalUpdateProfileService = (
  options: UseRequestOption
): {
  run: (requestBody: UpdateUserRequest) => void;
  data: any | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(personalUpdateProfile, options);
};

export const usePersonalChangePasswordService = (
  options: UseRequestOption
): {
  run: (requestBody: ChangePasswordRequest) => void;
  data: any | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(personalChangePassword, options);
};

export const usePersonalGetPermissionsService = (
  options: UseRequestOption
): {
  run: () => void;
  data: Array<string> | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(personalGetPermissions, options);
};

export const usePersonalGetLogsService = (
  options: UseRequestOption
): {
  run: () => void;
  data: Array<AuditDto> | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(personalGetLogs, options);
};

