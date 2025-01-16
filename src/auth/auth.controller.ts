import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/service/users.service';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decrator';
import { IUserActive } from 'src/common/interfaces/user-active.interface';
import { JwtService } from '@nestjs/jwt';

// interface IRequestWithUser extends Request {
//   user: {
//     email: string;
//     role: string;
//   };
// }

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }

  // @Get('profile')
  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  // profile(@Req() req: IRequestWithUser) {
  //   return this.authService.profile(req.user);
  // }

  @Get('profile')
  @Auth(Role.USER)
  profile(@ActiveUser() user: IUserActive) {
    return this.authService.profile(user);
  }
}
