/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DomainEvent } from "./DomainEvent";

export type BaseEntityOfGuid = {
  id?: string;
  domainEvents?: Array<DomainEvent>;
};

