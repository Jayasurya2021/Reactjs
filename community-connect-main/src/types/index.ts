export type UserRole = 'user' | 'admin';

export type ComplaintStatus = 'pending' | 'in-progress' | 'resolved';

export type ComplaintCategory = 'road' | 'water' | 'electricity' | 'garbage';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  location: string;
  imageUrl?: string;
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  complaintId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  content: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface CreateComplaintData {
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  image?: File;
}

export interface UpdateComplaintStatusData {
  status: ComplaintStatus;
}

export interface CreateCommentData {
  content: string;
}

export interface ComplaintFilters {
  category?: ComplaintCategory | 'all';
  status?: ComplaintStatus | 'all';
  search?: string;
}
