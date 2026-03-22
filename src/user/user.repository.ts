import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './schema/user.dto';
import { UserDocument } from './schema/user.mongooseSchema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('Users', 'default')
    private userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }
  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
  async findAll() {
    return this.userModel.find().exec();
  }
  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
