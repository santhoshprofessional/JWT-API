import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.mongooseSchema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'User',
          schema: UserSchema,
        },
      ],
      'default',
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
