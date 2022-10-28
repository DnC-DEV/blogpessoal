import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class UsuarioLogin {
  @ApiProperty()
  public usuario: string;
  
  @ApiProperty()
  public senha: string;
}
