import { Injectable } from "@nestjs/common";
import * as bcrypt from 'Bcrypt'

@Injectable()
export class Bcrypt{
    async criptografaSenha (senha: string): Promise<string>{

        let saltos = 10;

        return await bcrypt.hash(senha, saltos);
    }

    async compararSenhas (senhaBanco: string, senhaDigitada: string): Promise<boolean>{
        return bcrypt.compareSync(senhaDigitada, senhaBanco);
        
    }
}