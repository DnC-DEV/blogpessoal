import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from '../../auth/guard/jwt.auth.guard';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from '../services/usuario.service';

@ApiTags('Usuario')
@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioService.findAll();
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() usuario: Usuario): Promise<Usuario> {
    return await this.usuarioService.create(usuario);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async update(@Body() usuario: Usuario): Promise<Usuario> {
    return await this.usuarioService.update(usuario);
  }
}
