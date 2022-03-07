import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { ValidationPipe } from '@nestjs/common'

describe('AppController (e2e)', () => {
  let app: INestApplication

  //beforeEach => beforeAll로 변경해줘야 각각의 test마다 새로 서버를 만들지 않고
  //이전 테스트 기록이 그대로 이어진다
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    //테스트 환경에서도 pipe를 동일하게 적용시켜줘야 한다!
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
    )
    await app.init()
  })

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([])
    })
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2000,
          genres: ['test']
        })
        .expect(201)
    })
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2000,
          time: 20
        })
        .expect(400)
    })
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404)
    })
  })

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200)
    })
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/100').expect(404)
    })
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'update test' }).expect(200)
    })
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200)
    })
  })
})
