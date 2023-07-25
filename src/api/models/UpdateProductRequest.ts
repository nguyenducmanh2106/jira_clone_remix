/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileUploadRequest } from "./FileUploadRequest";

export type UpdateProductRequest = {
  id?: string;
  name: string;
  description?: string | null;
  rate?: number;
  brandId: string;
  deleteCurrentImage?: boolean;
  image?: FileUploadRequest | null;
};

