export interface ProjectSession {
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

export interface ProjectRound {
    id: string;
    project_session_id: string;
    round_number: number;
    start_date: Date;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface ProjectSessionSetting {
    id: string;
    project_session_id: string;
    allow_topic_registration: number;
    allow_cross_department_registration: number;
    allow_report_out_of_week : number;
    allow_evaluator_out_of_week: number;
    allow_topic_modification: number;
    created_at: string;
    updated_at: string;
}

export interface ProjectSessionSearchDTO {
    project_session_code: string;
    project_session_name: string;
    year_name: string;
    page: number;
    pageSize: number;
}