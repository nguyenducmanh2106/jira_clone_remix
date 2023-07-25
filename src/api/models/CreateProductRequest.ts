/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileUploadRequest } from "./FileUploadRequest";

export type CreateProductRequest = {
  name: string;
  description?: string | null;
  rate?: number;
  brandId: string;
  image?: FileUploadRequest | null;
};

