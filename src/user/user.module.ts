import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { UserSchema } from './schema/user.mongooseSchema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'Users',
          schema: UserSchema,
        },
      ],
      'default',
    ),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
