import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tema } from "src/tema/entities/tema.entity";
import { TemaService } from "src/tema/services/tema.service";
import { TemaModule } from "src/tema/tema.module";
import { postagemController } from "./controllers/postagem.controller";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]),TemaModule],
    providers: [PostagemService, TemaService],
    controllers: [postagemController],
    exports: [TypeOrmModule]
})
export class PostagemModule {}
