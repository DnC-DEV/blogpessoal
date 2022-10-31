import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  async criptografaSenha(senha: string): Promise<string> {
    const saltos = 10;

    return await bcrypt.hash(senha, saltos);
  }

  async compararSenhas(
    senhaBanco: string,
    senhaDigitada: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(senhaDigitada, senhaBanco);
  }
}
