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
import { EmailService } from "./send_mail.service";
import { ApproveProjectRepository } from "../repositories/approveProjectRepository";

@injectable()
export class ApproveProjectService {
    constructor(
        private approveProjectRepository: ApproveProjectRepository,
        private sendMailService: EmailService
    ) {}

    async getPendingProjectForLecturer(
        projectRoundId: string,
        lecturerId: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        try {
            // Gọi tới repo để truy vấn cơ sở dữ liệu
            const projects =
                await this.approveProjectRepository.getPendingProjectForLecturer(
                    projectRoundId,
                    lecturerId,
                    page,
                    pageSize
                );

            // Dưới đây có thể thêm xử lý logic nếu cần trước khi trả kết quả
            return {
                data: projects.map((p: any) => ({
                    project_request_id: p.project_request_id,
                    project_id: p.project_id,
                    project_name: p.project_name,
                    project_description: p.project_description,
                    student_code: p.student_code,
                    student_name: p.student_name,
                    class_code: p.class_code,
                    class_name: p.class_name,
                    lecturer_name: p.lecturer_name,
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

    async getPendingProjectForDean(
        projectRoundId: string,
        deanId: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        try {
            // Gọi tới repo để truy vấn cơ sở dữ liệu
            const projects =
                await this.approveProjectRepository.getPendingProjectForDean(
                    projectRoundId,
                    deanId,
                    page,
                    pageSize
                );

            return {
                data: projects.map((p: any) => ({
                    project_request_id: p.project_request_id,
                    project_id: p.project_id,
                    project_name: p.project_name,
                    project_description: p.project_description,
                    student_code: p.student_code,
                    student_name: p.student_name,
                    class_code: p.class_code,
                    class_name: p.class_name,
                    lecturer_name: p.lecturer_name,
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

    async lecturerApproveProject(projectRequestId: string): Promise<any> {
        try {
            const projects =
                await this.approveProjectRepository.lecturerApproveProject(
                    projectRequestId
                );

            if (projects) {
                const info =
                    await this.approveProjectRepository.getDeanByRequestId(
                        projectRequestId
                    );
                if (info[0]) {
                    const { dean_fullname, dean_email, student_name, lecturer_name, project_name } = info[0];
                    const subject = "Thông báo phê duyệt đề tài";
                    const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2 style="color: #2a7ae2;">Thông Báo Phê Duyệt Đề Tài</h2>
    <p>Xin chào thầy/cô <strong>${dean_fullname}</strong>,</p>

    <p>
      Chúng tôi xin thông báo rằng đề tài của sinh viên <strong>${student_name}</strong> đã được giảng viên phê duyệt.
    </p>

    <table style="width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 8px; font-weight: bold; width: 150px; border: 1px solid #ddd;">Tên đề tài:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${project_name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Sinh viên:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${student_name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Giảng viên hướng dẫn:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${lecturer_name}</td>
      </tr>
    </table>

    <p>
      Vui lòng xem xét và chấp thuận đề tài này hoặc yêu cầu thay đổi nếu cần. Nếu bạn cần thông tin chi tiết hơn, vui lòng liên hệ với giảng viên hoặc sinh viên.
    </p>

    <p style="margin-top: 30px;">Trân trọng,<br />
    <strong>Đội ngũ Quản lý Đề Tài</strong></p>

    <hr style="margin-top: 40px;" />
    <small style="color: #888;">
      Email này được gửi tự động từ hệ thống. Vui lòng không trả lời email này.
    </small>
  </div>
`;
                    await this.sendMailService.sendMail(
                        dean_email,
                        subject,
                        html
                    );
                }
            }

            return {
                data: projects,
            };
        } catch (error: any) {
            // Xử lý lỗi
            throw new Error(error.message);
        }
    }

    async deanApproveProject(projectRequestId: string): Promise<any> {
        try {
            const projects =
                await this.approveProjectRepository.deanApproveProject(
                    projectRequestId
                );

            return {
                data: projects,
            };
        } catch (error: any) {
            // Xử lý lỗi
            throw new Error(error.message);
        }
    }

    async searchLecturerRound(lecturerId: string): Promise<any> {
        try {
            const round =
                await this.approveProjectRepository.searchLecturerRound(
                    lecturerId
                );

            return {
                data: round,
            };
        } catch (error: any) {
            // Xử lý lỗi
            throw new Error(error.message);
        }
    }
}
