/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseEntityOfGuid } from "./BaseEntityOfGuid";

export type AuditableEntityOfGuid = BaseEntityOfGuid & {
  createdBy?: string;
  createdOn?: string;
  lastModifiedBy?: string;
  lastModifiedOn?: string | null;
  deletedOn?: string | null;
  deletedBy?: string | null;
};

