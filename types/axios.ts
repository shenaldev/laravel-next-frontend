type ErrorCodes =
  | "ERR_BAD_REQUEST"
  | "ERR_UNAUTHORIZED"
  | "ERR_NOT_FOUND"
  | "ERR_INTERNAL_SERVER_ERROR";

export type ApiErrorResponse = {
  code: ErrorCodes;
  message: string;
  name: string;
  request: object;
  response: {
    data: {
      errors?: {
        [key: string]: string[];
      };
      message: string;
    };
    status: number;
  };
  status: number;
};
