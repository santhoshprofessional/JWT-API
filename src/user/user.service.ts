import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './schema/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const existingUser = await this.userRepository.findByEmail(email);
    console.log('user', existingUser);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const data = await this.userRepository.create(createUserDto);
    return {
      message: 'User created successfully',
      data: data,
    };
  }
  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
  async findAll() {
    return this.userRepository.findAll();
  }
  async deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
