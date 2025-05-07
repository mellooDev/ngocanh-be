import { container } from "tsyringe";
import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";
import { UserLoginDTO } from "../models/user.model";

export class UserController {
    private authService: AuthService;

    constructor() {
        this.authService = container.resolve(AuthService);
    }

    login = async (req: Request, res: Response): Promise<any> => {
        console.log(req.body);
        try {
            const { usernameOrEmail, password } = req.body;

            if (!usernameOrEmail || !password) {
                res.status(400).json({ message: "Thiếu thông tin đăng nhập." });
                return;
            }

            // Kiểm tra và ép kiểu đúng
            const userLoginDto: UserLoginDTO = {
                usernameOrEmail,
                password,
            };

            const { token, user } = await this.authService.login(
                userLoginDto
            );

            // res.cookie('token', token, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: 'strict',
            //     maxAge: 60 * 60 * 1000
            // })

            // Trả về token và thông tin người dùng
            return res.status(200).json({
                message: 'Login successfully',
                token,
                user
            });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    };
}
