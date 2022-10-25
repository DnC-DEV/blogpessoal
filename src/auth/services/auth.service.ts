import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    async validateUser(usarname: string, password: string): Promise<any> {
        const buscaUsuario = await this.usuarioService.findByUsuario(usarname);

        if (!buscaUsuario)
            throw new HttpException('Usuario não encontrado! ', HttpStatus.NOT_FOUND);

        const match = await this.bcrypt.compararSenhas(buscaUsuario.senha, password);

        if (buscaUsuario && match) {
            const { senha, ...result } = buscaUsuario;
            return result;
        }
        return null;
    }
    async login(usuarioLogin: any) {
        const payload = {
            username: usuarioLogin.usuario,
            sub: 'blogpessoal'
        };
        return{
            usuario: usuarioLogin.usuario,
            token: `Bearer ${this.jwtService.sign(payload)}`
        }
    }
}