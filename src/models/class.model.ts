export interface Classes {
    id: string;
    major_name: string;
    department_id: string;
    created_at: string;
    updated_at: string;
}

export interface ClassSearchDTO {
    class_name: string;
    page: number;
    pageSize: number;
}