import { Request, Response } from "express";
import { EmailService } from "../services/send_mail.service";
import { injectable } from "tsyringe";

@injectable()
export class EmailController {
    private emailService: EmailService;

    constructor(emailService: EmailService) {
        this.emailService = emailService;
    }

    async sendEmail(req: Request, res: Response) {
        try {
            const {to, subject, html} = req.body;

            await this.emailService.sendMail(to, subject, html);

            res.status(200).json({
                code: 200,
                status: "SUCCESS",
                message: "send mail successfully"
            })
        } catch (error) {
            res.status(500).json({
                code: 500,
                status: "ERROR",
                message: "error when send mail"
            })
        }
    }
}