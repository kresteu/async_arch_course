import {ExceptionFilter, Catch, ArgumentsHost, HttpException, UnauthorizedException} from '@nestjs/common';
import { Request, Response } from 'express';
import {jwtConstants} from "./constants";

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.redirect('http://localhost:1001?client_id='+jwtConstants.clientId)
    }
}