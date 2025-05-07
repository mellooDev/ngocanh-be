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
}

export interface UserLoginDTO{
    usernameOrEmail: string;
    password: string;
}