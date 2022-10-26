import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Teste dos modules usuarios e auth (e2e)', () => {
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'db_blogpessoal_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  
  it('01 - Deve Cadastrar usuario', async () => {
    const resposta = await request(app.getHttpServer())
    .post('/usuario/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: ' '
    });
    expect(201)

    usuarioId = resposta.body.id;
  });
  it('02 - Deve Autenticar Usuario (Login)', async () => {
    const resposta = await request(app.getHttpServer())
    .post('/auth/logar')
    .send({
        usuario: 'root@root.com',
        senha: 'rootroot',
    });
    expect(200)

    token = resposta.body.token;
  });

  it('03 - Não Deve Duplicar o Usuario', async () => {
      request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
          nome: 'root',
          uruario: 'root@root.com',
          senha: 'rootroot',
          foto: ' '
      })
      .expect(400)
  });
  it('04 - Deve listar todos os Usuarios', async () => {
    request(app.getHttpServer())
    .get('/usuarios/all')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
  });
  it('05 - Deve Atualizar um Usuário', async () => {
    request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId,
        nome: 'Root Atualizado',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ' '
  })
  .then(resposta =>{
    expect("Root Atualizado").toEqual(resposta.body.nome);
  })
  expect(200)
  });
});