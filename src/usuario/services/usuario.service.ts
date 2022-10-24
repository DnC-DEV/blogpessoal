import { Injectable } from "@nestjs/common/decorators";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ){}

    async findByUsuario(usuario: string): Promise<Usuario>{

        return await this.usuarioRepository.findOne({
            where:{
                usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]>{

        return await this.usuarioRepository.find({
            relations:{
                postagem: true
            }
        })
    }

    async findById(id: number): Promise<Usuario>{

        let buscaUsuario = await this.usuarioRepository.findOne({
            where:{
                id
            }
        })

        if(!buscaUsuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
        return buscaUsuario;
    }

    async create (usuario: Usuario): Promise<Usuario>{

        let buscaUsuario = await this.findByUsuario(usuario.usuario);

        if(!buscaUsuario){
            usuario.senha = await this.bcrypt.criptografaSenha(usuario.senha)
            return await this.usuarioRepository.save(usuario);
        }
        throw new HttpException('Usuário já existe!', HttpStatus.BAD_REQUEST);
    }

    async update(usuario: Usuario): Promise<Usuario>{

        let updateUsuario: Usuario = await this.findById(usuario.id);
        let buscaUsuario = await this.findByUsuario(usuario.usuario);

        if(!updateUsuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
        if(usuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('usuario (e-mail) já cadastrado, digite outro!', HttpStatus.BAD_REQUEST);
        
        usuario.senha = await this.bcrypt.criptografaSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }
}