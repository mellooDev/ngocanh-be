export interface Students {
    id: string;
    project_session_name: string;
    project_session_code: string;
    start_date: Date;
    type: string;
    major_id: string;
    major_name: string;
    academic_year_id: string;
    year_name: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface InsertStudentDto {
    // Thông tin người dùng (Users)
    user_id: string;
    username: string;
    password: string;
    email: string;
    fullname: string;
    phone_number: string;
    role_id: string;

    // Thông tin sinh viên (Students)
    id: string;
    student_code: string;
    status: string;
    class_id: string;
    created_at: string; // ISO string để gửi từ client
    updated_at: string;
}

export interface StudentSearchDTO {
    studentName: string;
    studentCode: string;
    classCode: string;
    status: string;
    page: number;
    pageSize: number;
}
