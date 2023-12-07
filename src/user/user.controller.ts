import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto';
@Controller('user') // khai báo class là controller
export class UserController {
  // khai báo constructor cho controller, import service từ Provider
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async findAllUser(): Promise<UserDTO[]> {
    return await this.userService.findAll();
  }

  @Post()
  async createUser(@Body() RequestBody: any): Promise<any> {
    return await this.userService.create(RequestBody);
  }

  @Get(':id')
  async searchById(@Param('id') userId: number): Promise<any> {
    return await this.userService.findOne(userId);
  }
}
