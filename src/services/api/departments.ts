import { api } from './client';
import { API_ENDPOINTS } from './config';
import { Department, DepartmentCreate, DepartmentUpdate, PaginatedResponse } from './types';

export const departmentService = {
  // Get all departments with pagination
  getDepartments: (skip = 0, limit = 100) => 
    api.get<PaginatedResponse<Department>>(API_ENDPOINTS.DEPARTMENTS, { skip, limit }),

  // Get filtered departments
  getFilteredDepartments: (params: { id?: number; name?: string; skip?: number; limit?: number }) =>
    api.get<PaginatedResponse<Department>>(API_ENDPOINTS.DEPARTMENTS_FILTER, params),

  // Get department by ID
  getDepartmentById: (id: number) =>
    api.get<Department>(API_ENDPOINTS.DEPARTMENT_BY_ID(id)),

  // Create new department
  createDepartment: (department: DepartmentCreate) =>
    api.post<Department>(API_ENDPOINTS.DEPARTMENTS, department),

  // Update department
  updateDepartment: (id: number, department: DepartmentUpdate) =>
    api.put<Department>(API_ENDPOINTS.DEPARTMENT_BY_ID(id), department),

  // Delete department
  deleteDepartment: (id: number) =>
    api.delete(API_ENDPOINTS.DEPARTMENT_BY_ID(id)),
};