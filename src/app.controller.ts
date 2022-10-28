import { Controller, Get } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators';
import { ApiExcludeEndpoint } from '@nestjs/swagger/dist/decorators';

@Controller()
export class AppController {
  constructor() {}

  @ApiExcludeEndpoint()
  @Get()
  async redirect(
    @Res()
    resposta: any
    ) {
      return resposta.redirect('/swagger');
    }
}
