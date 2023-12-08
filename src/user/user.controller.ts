import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './user.enity';
import { LoggingInterceptor } from './interceptors/logging.interceptors';
@Controller('user') // khai báo class là controller
export class UserController {
  // khai báo constructor cho controller, import service từ Provider
  constructor(private readonly userService: UserService) {}
  @Get('all')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAllUser(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(LoggingInterceptor)
  // về cơ bản cũng giống như interceptor của axios, xử lý trước khi trả về /handle response, request
  async createUser(@Body() RequestBody: CreateUserDto): Promise<any> {
    return await this.userService.create(RequestBody);
  }

  @Get('/:id')
  async searchById(@Param('id', ParseIntPipe) userId: number): Promise<any> {
    return await this.userService.findOne(userId);
  }

  @Put('/:id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() requestBody: UpdateUserDto,
  ) {
    return await this.userService.updateUserById(id, requestBody);
  }
}
