import { Controller, Get, Post, UseGuards,Res,Request, Body, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';



@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


@UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Res() res, @Request() req) {
    try {
      let result =  await this.authService.login(req.user);
      if (result != undefined){
        res.status(HttpStatus.OK).send(result);
      }else{
        res.status(HttpStatus.NOT_FOUND).json('{"message":"username or password invalid"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  
  @Post('reset/password')
  async sendEmail(@Res() res, @Body() email) {
    try {
      let result =  await this.authService.sendEmail(email.email);
      if (result != undefined){
        res.status(HttpStatus.OK).send(result);
      }else{
        res.status(HttpStatus.NOT_FOUND).json('{"message":"e-mail not found"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('new/password')
  async newPassword(@Res() res, @Body() user, @Request() req) {
    try {
      let result =  await this.authService.checkEmailToken(user, req.user);
      if (result != undefined){
        res.status(HttpStatus.OK).send(result);
      }else{
        res.status(HttpStatus.NOT_FOUND).json('{"message":"token invalid"}');
      }
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).json(err.message);
    }
  }

}