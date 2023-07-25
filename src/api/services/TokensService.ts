/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorResult } from "../models/ErrorResult";
import type { RefreshTokenRequest } from "../models/RefreshTokenRequest";
import type { TokenRequest } from "../models/TokenRequest";
import type { TokenResponse } from "../models/TokenResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import {
  request as __request,
  useRequest,
  UseRequestOption,
} from "../core/request";

/**
 * Request an access token using credentials.
 * @param requestBody
 * @param tenant Input your tenant Id to access this API
 * @returns TokenResponse
 * @returns ErrorResult
 * @throws ApiError
 */
export const tokensGetToken = (
  requestBody: TokenRequest,
  tenant: string = ""
): CancelablePromise<TokenResponse | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/tokens`,
    headers: {
      tenant: tenant,
    },
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Request an access token using a refresh token.
 * @param requestBody
 * @param tenant Input your tenant Id to access this API
 * @returns TokenResponse
 * @returns ErrorResult
 * @throws ApiError
 */
export const tokensRefresh = (
  requestBody: RefreshTokenRequest,
  tenant: string = ""
): CancelablePromise<TokenResponse | ErrorResult> => {
  return __request({
    method: "POST",
    path: `/api/tokens/refresh`,
    headers: {
      tenant: tenant,
    },
    body: requestBody,
    mediaType: "application/json",
  });
};

export const useTokensGetTokenService = (
  options: UseRequestOption
): {
  run: (requestBody: TokenRequest, tenant: string = "") => void;
  data: TokenResponse | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(tokensGetToken, options);
};

export const useTokensRefreshService = (
  options: UseRequestOption
): {
  run: (requestBody: RefreshTokenRequest, tenant: string = "") => void;
  data: TokenResponse | ErrorResult;
  loading: boolean;
  error?: Error;
  params?: any;
} => {
  return useRequest(tokensRefresh, options);
};

