import type { ApiResponse } from "@phishare/shared"

export async function FetchFromAPI<T>(
  endpoint: string,
  options: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      ...options,
    })
    if (!response.ok && response.status === 500) {
      return {
        success: false,
        error: {
          type: "SERVER",
          message: "Internal Server Error",
        },
      }
    }
    const data: ApiResponse<T> = await response.json()
    return data
  } catch (err) {
    return {
      success: false,
      error: {
        type: "SERVER",
        message: err instanceof Error ? err.message : "Network Request failed",
      },
    }
  }
}
