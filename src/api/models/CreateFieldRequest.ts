/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocTypes } from "./DocTypes";

export type CreateFieldRequest = {
  /**
   * Code của trường.
   */
  fieldname: string;
  /**
   * Loại dữ liệu của trường. Ví dụ: Select,Data,Link,Image.
   */
  fieldtype?: string | null;
  oldfieldname?: string | null;
  oldfieldtype?: string | null;
  label?: string | null;
  setOnlyOnce?: boolean | null;
  inGlobalSearch?: boolean | null;
  searchIndex?: boolean | null;
  inStandardFilter?: boolean | null;
  reqd?: boolean | null;
  hidden?: boolean | null;
  printHide?: boolean | null;
  rememberLastSelectedValue?: boolean | null;
  collapsible?: boolean | null;
  showDashboard?: boolean | null;
  /**
   * Trường thứ tự, tự động sinh ra theo thứ tự tăng dần.
   */
  idx?: number;
  /**
   * Trường để map với bảng DocTypes.
   */
  docTypeId: string;
  docType?: DocTypes;
  bold?: boolean;
  inListView?: boolean | null;
  /**
   * Trường thể hiện đây có phải là dữ liệu duy nhất không.
   */
  unique?: boolean | null;
  /**
   * Trường thể hiện đây có phải là dữ liệu bắt buộc không.
   */
  mandatory?: boolean | null;
  readOnly?: boolean | null;
  /**
   * This field will appear only if the fieldname defined here has value OR the rules are true (examples): myfield eval:doc.myfield=='My Value' eval:doc.age>18.
   * Chú ý: doc.__islocal dùng để check tài liệu đã được lưu ít nhất 1 lần hay chưa bao giờ được lưu. Nếu __islocal là 1 thì tài liệu chưa bao giờ được lưu.
   */
  dependsOn?: string | null;
  mandatoryDependsOn?: string | null;
  readOnlyDependsOn?: string | null;
  /**
   * For Links, enter the DocType as range. For Select, enter list of Options, each on a new line.
   */
  options?: string | null;
  /**
   * Giá trị khởi tạo mặc định.
   */
  default?: string | null;
  /**
   * Thể hiện trường này có phải dữ liệu ảo hay không.
   * Dữ liệu ảo sẽ không được lưu vào trong cơ sở dữ liệu mà sẽ được tính toán từ các trường khác dựa vào công thức được định nghĩa trong cột Options.
   */
  isVirtual?: boolean | null;
};

