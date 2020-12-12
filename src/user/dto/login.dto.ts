import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// @ApiExtraModels(LoginDTO)
export default class LoginDTO {
  @ApiProperty({ 
    description: '用户名', 
    example: 'test', 
  })
  @IsNotEmpty({ 
    message: '用户名不能为空' 
  })
  readonly username: string;

  @ApiProperty({
    description: '密码', 
    example: '123456' 
  })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

