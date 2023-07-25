/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TenantDto = {
  id?: string;
  name?: string;
  connectionString?: string | null;
  adminEmail?: string;
  isActive?: boolean;
  validUpto?: string;
  issuer?: string | null;
};

