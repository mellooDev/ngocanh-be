export interface Users {
    id: string;
    username: string;
    password: string;
    email: string;
    fullname: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
    status: string;
    avatar: string;
    role_id: string;
    role_name: string;

    student_id?: string;
  student_code?: string;
  student_status?: string;
  class_id?: string;
  lecturer_id?: string;
  lecturer_code?: string;
  academic_rank_lecturer?: string;
  degree_lecturer?: string;
  major_id_lecturer?: string;
  max_slot_lecturer?: number;
  dean_id?: string;
  dean_code?: string;
  academic_rank_dean?: string;
  degree_dean?: string;
  major_id_dean?: string;
  max_slot_dean?: number;
}

export interface UserLoginDTO{
    usernameOrEmail: string;
    password: string;
}