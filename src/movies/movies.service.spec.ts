import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { MoviesService } from './movies.service'

describe('MoviesService', () => {
  let service: MoviesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService]
    }).compile()

    service = module.get<MoviesService>(MoviesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getAll', () => {
    it('should return an arr', () => {
      const result = service.getAll()
      expect(result).toBeInstanceOf(Array)
    })
  })

  describe('getOne', () => {
    it('movie를 리턴한다', () => {
      service.create({ title: 'test movie', genres: ['test'], year: 2020 })
      const movie = service.getOne(1)
      expect(movie).toBeDefined()
      expect(movie.id).toEqual(1)
    })
    it('404 error를 리턴한다', () => {
      try {
        service.getOne(100)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error.message).toEqual('Movie with ID 100 not found.')
      }
    })
  })
})
