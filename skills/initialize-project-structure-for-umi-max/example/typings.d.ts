declare namespace API {
  export type BaseResponse<T = unknown> = {
    code: number;
    msg: string;
    success: boolean;
    data: T;
  };

  export type BaseListResponse<T = unknown> = {
    code: number;
    msg: string;
    success: boolean;
    data: {
      records: T[];
      total: number;
      size: number;
      pages: number;
      current: number;
    };
  };
}
