/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AuditDto = {
  id?: string;
  userId?: string;
  type?: string | null;
  tableName?: string | null;
  dateTime?: string;
  oldValues?: string | null;
  newValues?: string | null;
  affectedColumns?: string | null;
  primaryKey?: string | null;
};

