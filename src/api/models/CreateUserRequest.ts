/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string | null;
};

