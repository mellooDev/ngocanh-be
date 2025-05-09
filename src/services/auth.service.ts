import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { authConfig } from '../config/config';
import { UserLoginDTO, Users } from '../models/user.model';
import {v4 as uuidv4} from 'uuid'
import { UserRepository } from '../repositories/userRepository';
import { EmailService } from './send_mail.service';
import { injectable } from 'tsyringe';

@injectable()
export class AuthService {

  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService
  ) {
    
  }

  async login(login: UserLoginDTO): Promise<any> {
    const {usernameOrEmail, password} = login;

    const user = await this.userRepository.findUserByUsernameOrEmail(usernameOrEmail);

    if (!user) {
      throw new Error('Tài khoản không tồn tại');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Sai mật khẩu');
    }

    const payload: any = {
      id: user.id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      role_id: user.role_id,
      role_name: user.role_name,
    };

    if (user.role_name === 'student') {
      payload.student_id = user.student_id;
      payload.student_code = user.student_code;
      payload.student_status = user.student_status;
      payload.class_id = user.class_id;
    } else if (user.role_name === 'lecturer') {
      payload.lecturer_id = user.lecturer_id;
      payload.lecturer_code = user.lecturer_code;
      payload.academic_rank = user.academic_rank_lecturer;
      payload.degree = user.degree_lecturer;
      payload.major_id = user.major_id_lecturer;
      payload.max_slot = user.max_slot_lecturer;
    } else if (user.role_name === 'dean') {
      payload.dean_id = user.dean_id;
      payload.dean_code = user.dean_code;
      payload.academic_rank = user.academic_rank_dean;
      payload.degree = user.degree_dean;
      payload.major_id = user.major_id_dean;
      payload.max_slot = user.max_slot_dean;
    }

    const options: SignOptions = {
      expiresIn: '1h',
    };
    
    const token = jwt.sign(payload as object, authConfig.jwtSecret as Secret, options);

    const { password: _, ...safeUser } = user;

    return {
      token,
      user: safeUser,
    };
  }
  
}