/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AuditableEntity } from "./AuditableEntity";

export type DocTypes = AuditableEntity & {
  /**
   * Code của các phân hệ chức năng.
   */
  docType?: string;
  documentType?: string;
  /**
   * Tên module của phần mềm.
   */
  module?: string;
  /**
   * Code của doc type.
   */
  name?: string;
  /**
   * Tên của doc type.
   */
  label?: string;
};

