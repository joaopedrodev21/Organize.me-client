export interface User {
    id: number
    name: string
    email: string
    createdAt: string
}

export interface Task {
    id: number
    title: string
    description: string | null
    done: boolean
    priority: "LOW" | "HIGH"
    dueDate: string | null
    userId: number
    createdAt: string
    updatedAt: string
}

export interface CreateTaskData {
    title: string
    description?: string
    priority: "LOW" | "HIGH"
    done?: boolean
    dueDate?: string
}

export interface UpdateTaskData {
    title?: string
    description?: string
    priority?: "LOW" | "HIGH"
    done?: boolean
    dueDate?: string
}

export interface LoginResponse {
    token: string
    user: User
}
export interface PaginatedResponse {
  data: Task[]
  total: number
  page: number
  limit: number
}

