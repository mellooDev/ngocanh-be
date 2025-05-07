import { injectable } from "tsyringe";
import transporter from "../config/send_mail"

@injectable()
export class EmailService {
    async sendMail(to: string, subject: string, html: string): Promise<any> {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject,
                html
            }

            const info = await transporter.sendMail(mailOptions);
            return info;
        } catch (error) {
            console.error('error sending email: ', error);
        }
    }
}