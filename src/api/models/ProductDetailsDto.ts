/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BrandDto } from "./BrandDto";

export type ProductDetailsDto = {
  id?: string;
  name?: string;
  description?: string | null;
  rate?: number;
  imagePath?: string | null;
  brand?: BrandDto;
};

