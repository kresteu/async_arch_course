import { Module } from '@nestjs/common';
import {AuthService} from "./auth.service";
import {HttpModule} from "@nestjs/axios";
import {UsersModule} from "../users/users.module";
import {jwtConstants} from "./constants";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [HttpModule, UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
