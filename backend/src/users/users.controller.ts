// src/users/users.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(private usersService: UsersService) {}
  
    @Post()
    create(@Body() data: { name: string; email: string; password: string }) {
      return this.usersService.createUser(data);
    }
  
    @Get()
    findAll() {
      return this.usersService.findAllUsers();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.usersService.findUserById(Number(id));
    }
  
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() data: { name?: string; email?: string },
    ) {
      return this.usersService.updateUser(Number(id), data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.usersService.deleteUser(Number(id));
    }
  }