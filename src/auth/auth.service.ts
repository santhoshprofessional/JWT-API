import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
