const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export class ApiError extends Error {
  statusCode: number;
  details?: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('astamami_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const response = await fetch(`${API_URL}${cleanEndpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg =
      data?.error || data?.message || `Request failed with status ${response.status}`;
    throw new ApiError(errorMsg, response.status, data?.details);
  }

  // Handle TransformInterceptor envelope { success: true, data: ... }
  return data?.data !== undefined ? data.data : data;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
