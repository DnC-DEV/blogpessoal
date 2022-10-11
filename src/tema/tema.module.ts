import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { temaController } from "./controllers/tema.controller";
import { Tema } from "./entities/tema.entity";
import { TemaService } from "./services/tema.service";



@Module({
    imports: [TypeOrmModule.forFeature([Tema])],
    providers: [TemaService],
    controllers: [temaController],
    exports: [TypeOrmModule]
})
export class TemaModule { }