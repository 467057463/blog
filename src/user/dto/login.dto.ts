import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// @ApiExtraModels(LoginDTO)
export default class LoginDTO {

  @IsNotEmpty({ 
    message: '用户名不能为空' 
  })
  readonly username: string;


  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

