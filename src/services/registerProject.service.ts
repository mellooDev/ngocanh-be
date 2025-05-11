import { injectable } from "tsyringe";
import { MajorRepository } from "../repositories/majorRepository";
import { Majors } from "../models/major.model";
import { ProjectSessionRepository } from "../repositories/projectSessionRepository";
import {
    ProjectRound,
    ProjectSession,
    ProjectSessionSetting,
} from "../models/projectSession.model";
import { v4 as uuidv4 } from "uuid";
import { RegisterProjectRepository } from "../repositories/registerProjectRepository";
import { EmailService } from "./send_mail.service";

@injectable()
export class RegisterProjectService {
    constructor(
        private registerProjectRepository: RegisterProjectRepository,
        private sendMailService: EmailService
    ) {}

    async searchProjectForStudent(
        studentId: string,
        projectRoundId: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        try {
            // Gọi tới repo để truy vấn cơ sở dữ liệu
            const projects =
                await this.registerProjectRepository.searchProjectForStudent(
                    studentId,
                    projectRoundId,
                    page,
                    pageSize
                );

            // Dưới đây có thể thêm xử lý logic nếu cần trước khi trả kết quả
            return {
                data: projects.map((p: any) => ({
                    id: p.id,
                    project_name: p.project_name,
                    description: p.description,
                    lecturer_id: p.lecturer_id,
                    lecturer_name: p.lecturer_name,
                    lecturer_email: p.lecturer_email,
                    lecturer_phone: p.lecturer_phone,
                    student_id: p.student_id,
                    student_name: p.student_name,
                    created_at: p.created_at,
                    updated_at: p.updated_at,
                    lecturer_slot_usage: p.lecturer_slot_usage,
                })),
                pagination: {
                    total: projects[0]?.total_count || 0,
                    totalPages: projects[0]?.total_pages || 1,
                    currentPage: projects[0]?.current_page || page,
                },
            };
        } catch (error: any) {
            // Xử lý lỗi
            throw new Error(error.message);
        }
    }

    async searchStudentRound(studentId: string): Promise<any> {
        try {
            // Gọi tới repo để truy vấn cơ sở dữ liệu
            const rounds =
                await this.registerProjectRepository.searchStudentRound(
                    studentId
                );
            return {
                data: rounds,
            };
        } catch (error: any) {
            // Xử lý lỗi
            throw new Error(error.message);
        }
    }

    async studentRegisterProject(
        projectId: string,
        studentId: string
    ): Promise<any> {
        try {
            console.log("Calling repository with:", { projectId, studentId });
            const result =
                await this.registerProjectRepository.studentRegisterProject(
                    projectId,
                    studentId
                );

            if (result) {
                console.log("result: ", result);

                const projectInfo =
                    await this.registerProjectRepository.getProjectRegistrationInfo(
                        projectId
                    );
                console.log("projectId: ", projectId);
                console.log("projectInfo: ", projectInfo);

                if (projectInfo[0]) {
                    const {
                        project_name,
                        student_name,
                        lecturer_email,
                        student_email,
                        lecturer_name,
                    } = projectInfo[0];

                    if (lecturer_email) {
                        const subject = "Thông báo đăng ký đề tài";
                        const html = `
                            <p>Xin chào thầy/cô <strong>${lecturer_name}</strong>,</p>
                            <p>Đề tài <strong>${project_name}</strong> của bạn đã được đăng ký bởi sinh viên <strong>${student_name}</strong>.</p> <br /> <p>Trân trọng.</p>
                        `;
                        await this.sendMailService.sendMail(
                            lecturer_email,
                            subject,
                            html
                        );
                    }

                    if (student_email) {
                        const subject = "Xác nhận đăng ký đề tài thành công";
                        const html = `
                            <p>Chào <strong>${student_name}</strong>,</p>
                            <p>Bạn đã đăng ký thành công đề tài <strong>${project_name}</strong>.</p>
                            <p>Vui lòng theo dõi thông báo tiếp theo từ giảng viên hướng dẫn.</p>
                        `;
                        await this.sendMailService.sendMail(
                            student_email,
                            subject,
                            html
                        );
                    }
                }
            }

            return {
                data: result,
            };
        } catch (error: any) {
            // Xử lý lỗi
            throw new Error(error.message);
        }
    }

    async studentPurposeProject(
        projectName: string,
        description: string,
        projectRoundId: string,
        studentId: string,
        lecturerId: string,
        defenseMode: string,
        projectCode: string
    ): Promise<any> {
        try {
            const projectId = uuidv4();
            const requestId = uuidv4(); 
            const result =
                await this.registerProjectRepository.studentPurposeProject(
                    projectId,
                    projectName,
                    description,
                    projectRoundId,
                    studentId,
                    lecturerId,
                    defenseMode,
                    projectCode,
                    requestId
                );

            if (result) {
                console.log("result: ", result);

                const projectInfo =
                    await this.registerProjectRepository.getProjectRegistrationInfo(
                        projectId
                    );
                console.log("projectId: ", projectId);
                console.log("projectInfo: ", projectInfo);

                if (projectInfo[0]) {
                    const {
                        project_name,
                        student_name,
                        lecturer_email,
                        student_email,
                        lecturer_name,
                    } = projectInfo[0];

                    if (lecturer_email) {
                        const subject = "Thông báo phê duyệt đề tài";
                        const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2 style="color: #2a7ae2;">Thông báo đề xuất đề tài mới</h2>
    <p>Xin chào thầy/cô <strong>${lecturer_name}</strong>,</p>

    <p>
      Sinh viên <strong>${student_name}</strong> đã gửi đề xuất thực hiện đề tài dưới sự hướng dẫn của thầy/cô.
    </p>

    <table style="width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 8px; font-weight: bold; width: 150px;">Tên đề tài:</td>
        <td style="padding: 8px;">${project_name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Sinh viên:</td>
        <td style="padding: 8px;">${student_name}</td>
      </tr>
    </table>

    <p>
      Vui lòng đăng nhập vào hệ thống để kiểm tra và duyệt đề tài này.
    </p>

    <p style="margin-top: 30px;">Trân trọng,<br />
    <strong>Phòng Quản lý Đề tài</strong></p>

    <hr style="margin-top: 40px;" />
    <small style="color: #888;">
      Email này được gửi tự động từ hệ thống. Vui lòng không trả lời email này.
    </small>
  </div>
`;

                        await this.sendMailService.sendMail(
                            lecturer_email,
                            subject,
                            html
                        );
                    }
                }
            }

            return {
                data: result,
            };
        } catch (error: any) {
            // Xử lý lỗi
            throw new Error(error.message);
        }
    }

    async getLecturerInRound(projectRoundId: string): Promise<any> {
        try {
            // Gọi tới repo để truy vấn cơ sở dữ liệu
            const lecturers =
                await this.registerProjectRepository.getLecturerInRound(
                    projectRoundId
                );
            return {
                data: lecturers,
            };
        } catch (error: any) {
            // Xử lý lỗi
            throw new Error(error.message);
        }
    }
}
