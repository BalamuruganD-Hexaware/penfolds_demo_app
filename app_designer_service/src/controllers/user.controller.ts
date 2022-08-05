import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { UserService } from "src/services/user.service";

@Controller("/user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("")
  fetchAll() {
    return this.userService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const user = await this.userService.fetchOne(+id);

    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Patch("/:id")
  async update(@Param("id") id: string, @Body() user: Partial<User>) {
    const receivedUser = await this.userService.update(+id, user);

    if (!receivedUser) throw new NotFoundException("User not found");

    return receivedUser;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedUser = await this.userService.delete(+id);

    if (!receivedUser) throw new NotFoundException("User not found");

    return receivedUser;
  }
}