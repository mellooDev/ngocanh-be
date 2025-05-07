export interface Majors {
    id: string;
    major_name: string;
    department_id: string;
    created_at: string;
    updated_at: string;
}

export interface MajorSearchDTO {
    major_name: string;
    page: number;
    pageSize: number;
}