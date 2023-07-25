/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateTenantRequest = {
  id: string;
  name: string;
  connectionString?: string | null;
  adminEmail: string;
  issuer?: string | null;
};

