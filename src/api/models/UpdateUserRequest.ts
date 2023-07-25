/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileUploadRequest } from "./FileUploadRequest";

export type UpdateUserRequest = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  email: string;
  image?: FileUploadRequest | null;
  deleteCurrentImage?: boolean;
};

