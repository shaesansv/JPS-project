const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: { message?: string };
}

class ApiService {
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (includeAuth) {
      const token = localStorage.getItem("adminToken");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Network error" }));
      return { success: false, error };
    }
    return response.json();
  }

  private async fetchApi<T>(
    url: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, options);
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("API Error:", error);
      return {
        success: false,
        error: {
          message:
            "Failed to connect to backend. Please ensure the server is running on port 5000.",
        },
      };
    }
  }

  // Auth
  async login(email: string, password: string) {
    return this.fetchApi(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });
  }

  async getMe() {
    return this.fetchApi(`${API_BASE_URL}/auth/me`, {
      headers: this.getHeaders(true),
    });
  }

  // Settings
  async getSettings() {
    return this.fetchApi(`${API_BASE_URL}/settings`);
  }

  async updateSettings(settings: any) {
    return this.fetchApi(`${API_BASE_URL}/settings`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(settings),
    });
  }

  // Categories
  async getCategories() {
    return this.fetchApi(`${API_BASE_URL}/categories`);
  }

  async createCategory(category: any) {
    return this.fetchApi(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(category),
    });
  }

  async updateCategory(id: string, category: any) {
    return this.fetchApi(`${API_BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(category),
    });
  }

  async deleteCategory(id: string) {
    return this.fetchApi(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  // Properties
  async getProperties(params?: {
    category?: string;
    available?: boolean;
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append("category", params.category);
    if (params?.available !== undefined)
      queryParams.append("available", String(params.available));
    if (params?.page)
      queryParams.append(
        "skip",
        String((params.page - 1) * (params.limit || 10))
      );
    if (params?.limit) queryParams.append("limit", String(params.limit));
    if (params?.search) queryParams.append("search", params.search);

    return this.fetchApi(`${API_BASE_URL}/properties?${queryParams}`);
  }

  async getProperty(id: string) {
    return this.fetchApi(`${API_BASE_URL}/properties/${id}`);
  }

  async createProperty(property: any) {
    return this.fetchApi(`${API_BASE_URL}/properties`, {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(property),
    });
  }

  async updateProperty(id: string, property: any) {
    return this.fetchApi(`${API_BASE_URL}/properties/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(property),
    });
  }

  async deleteProperty(id: string) {
    return this.fetchApi(`${API_BASE_URL}/properties/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  // Enquiries
  async getEnquiries(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page)
      queryParams.append(
        "skip",
        String(((params.page || 1) - 1) * (params.limit || 10))
      );
    if (params?.limit) queryParams.append("limit", String(params.limit));
    if (params?.status && params.status !== "all")
      queryParams.append("status", params.status);

    return this.fetchApi(`${API_BASE_URL}/enquiries?${queryParams}`, {
      headers: this.getHeaders(true),
    });
  }

  async updateEnquiry(id: string, data: any) {
    return this.fetchApi(`${API_BASE_URL}/enquiries/${id}`, {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(data),
    });
  }

  async deleteEnquiry(id: string) {
    return this.fetchApi(`${API_BASE_URL}/enquiries/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(true),
    });
  }

  async createEnquiry(data: any) {
    return this.fetchApi(`${API_BASE_URL}/enquiries`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
  }

  // Upload
  async uploadImages(files: FileList) {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    const token = localStorage.getItem("adminToken");
    return this.fetchApi(`${API_BASE_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  }
}

export const api = new ApiService();
