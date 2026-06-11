type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiError = {
  success: false;
  error: {
    message: string;
    type: string;
    field?: Record<string, string[]>;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
