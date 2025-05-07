export interface EmailTemplate {
    id: string;
    title: string;
    subject: string;
    code: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
}