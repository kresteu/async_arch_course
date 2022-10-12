import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import {Task} from "./tasks/entities/task.entity";
import {User} from "./users/entities/user.entity";
import {APP_GUARD} from "@nestjs/core";
import {HttpModule} from "@nestjs/axios";
import {AuthModule} from "./auth/auth.module";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Module({
  imports: [
    TasksModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'async_arch_course',
      schema: 'task',
      entities: [Task, User],
      synchronize: true,
     // logging: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
      AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
