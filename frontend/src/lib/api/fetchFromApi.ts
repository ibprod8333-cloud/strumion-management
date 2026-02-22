import { auth } from "@/lib/firebase/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Custom error class for API errors with status code
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public response?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Response type options for fetchFromApi
 */
export type ResponseType = "json" | "text" | "blob";

/**
 * Generic function for making authenticated API requests.
 * Automatically includes Firebase authentication token if user is logged in.
 * Supports JSON, text, or blob responses with comprehensive error handling.
 *
 * @param endpoint - API endpoint path (without base URL)
 * @param options - Fetch options (method, headers, body, etc.)
 * @param responseType - Expected response type (default: "json")
 * @returns Promise resolving to typed response data
 * @throws {ApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const user = await fetchFromApi<User>('/auth/me');
 * // Token is automatically included!
 * ```
 */
export async function fetchFromApi<T>(
    endpoint: string = "",
    options: RequestInit = {},
    responseType: ResponseType = "json"
): Promise<T> {
    const url = `${API_URL}${endpoint}`;

    // Get Firebase auth token if user is logged in
    const currentUser = auth.currentUser;
    const token = currentUser ? await currentUser.getIdToken() : null;

    // Development logging (can be disabled in production)
    if (process.env.NODE_ENV === 'development') {
        console.log(`[API] ${options.method || 'GET'} ${url}`);
        if (token) {
            console.log('[API] ✅ Token included');
            console.log('[API] Token:', token);
        } else {
            console.log('[API] ⚠️  No token (user not logged in)');
        }
    }

    // Determine if body is FormData to avoid setting Content-Type
    const isFormData = options.body instanceof FormData;

    // Build base headers
    const baseHeaders: HeadersInit = isFormData
        ? {} // Let browser set multipart/form-data boundary automatically
        : { "Content-Type": "application/json" };

    // Merge headers, ensuring passed headers take precedence
    // Automatically include Authorization header if token exists
    const headers: HeadersInit = {
        ...baseHeaders,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}), // User-provided headers override everything
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        // Handle non-OK responses
        if (!response.ok) {
            await handleErrorResponse(response);
        }

        // Handle empty responses (DELETE, 204 No Content, etc.)
        if (isEmptyResponse(response)) {
            return undefined as T;
        }

        // Parse response based on requested type
        return await parseResponse<T>(response, responseType);

    } catch (error) {
        // Re-throw ApiError instances
        if (error instanceof ApiError) {
            throw error;
        }

        // Wrap network errors
        if (error instanceof Error) {
            throw new ApiError(
                `Network error: ${error.message}`,
                0,
                null
            );
        }

        // Unknown error
        throw new ApiError('An unknown error occurred', 0, null);
    }
}

/**
 * Handles error responses from the API
 * @throws {ApiError} Always throws with appropriate error message
 */
async function handleErrorResponse(response: Response): Promise<never> {
    let errorMessage = `API error: ${response.status} ${response.statusText}`;
    let errorData: any = null;

    // Try to parse error body
    try {
        const contentType = response.headers.get("content-type");

        if (contentType?.includes("application/json")) {
            errorData = await response.json();

            // Extract error message from various response formats
            if (errorData && typeof errorData === "object") {
                if (typeof errorData.message === "string") {
                    errorMessage = errorData.message;
                } else if (typeof errorData.error === "string") {
                    errorMessage = errorData.error;
                } else if (Array.isArray(errorData.message)) {
                    // Handle validation errors (NestJS format)
                    errorMessage = errorData.message.join(', ');
                }
            }
        } else {
            // Non-JSON error response
            const text = await response.text();
            if (text) {
                errorMessage = text;
            }
        }
    } catch (parseError) {
        // If parsing fails, use default error message
        console.warn('[API] Failed to parse error response:', parseError);
    }

    throw new ApiError(errorMessage, response.status, errorData);
}

/**
 * Checks if the response is empty (no content)
 */
function isEmptyResponse(response: Response): boolean {
    const contentLength = response.headers.get("content-length");
    return contentLength === "0" || response.status === 204;
}

/**
 * Parses response based on the requested response type
 */
async function parseResponse<T>(
    response: Response,
    responseType: ResponseType
): Promise<T> {
    switch (responseType) {
        case "blob":
            return (await response.blob()) as unknown as T;

        case "text":
            return (await response.text()) as unknown as T;

        case "json":
        default:
            const contentType = response.headers.get("content-type");

            // Ensure response is actually JSON
            if (contentType?.includes("application/json")) {
                return (await response.json()) as T;
            }

            // Fallback: try to parse as text
            const text = await response.text();

            // If text is empty, return undefined
            if (!text) {
                return undefined as T;
            }

            // Try to parse text as JSON (in case content-type header is missing)
            try {
                return JSON.parse(text) as T;
            } catch {
                // If not JSON, return as text
                console.warn('[API] Response is not JSON, returning as text');
                return text as unknown as T;
            }
    }
}

/**
 * Helper function to build URL with query parameters
 *
 * @example
 * ```typescript
 * const url = buildUrl('/users', { page: 1, limit: 10 });
 * // Result: '/users?page=1&limit=10'
 * ```
 */
export function buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined | null>
): string {
    if (!params) return endpoint;

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `${endpoint}?${queryString}` : endpoint;
}