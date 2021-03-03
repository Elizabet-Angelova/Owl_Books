import { Controller, Post, Body, Delete, ValidationPipe, UseGuards } from "@nestjs/common";
import { AuthService } from "src/Services/authentication.service";
import { UserLoginDTO } from "src/Common/DTOs/userLogin.dto";
import { responseMessage } from "src/Enums/response.message.enum";
import { GetToken } from "src/auth/get-token.decorator";
import { BlacklistGuard } from "src/auth/blacklist.guard";


@Controller('session')

export class AuthController {

constructor(
    private readonly authService: AuthService,
) {}


@Post()
async login(@Body(new ValidationPipe({ whitelist: true})) userDto: UserLoginDTO): Promise<{ token: string }> {
    return await this.authService.login(userDto.username, userDto.password);
  }

  @Delete()
  async logout(@GetToken() token: string): Promise<responseMessage> {
    await this.authService.blacklist(token?.slice(7));

    return responseMessage['19']
  }

  
  
}