type ErrorType = "AUTHENTICATION" | "NOT FOUND" | "SERVER";

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: {
    message: string;
    type: ErrorType;
    field?: Record<string, string[]>;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
