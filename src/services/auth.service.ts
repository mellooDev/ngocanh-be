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

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      role_id: user.role_id,
      role_name: user.role_name,
    };

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