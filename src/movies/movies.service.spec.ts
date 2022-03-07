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

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000
      })
      const beforeMovies = service.getAll().length
      service.deleteOne(1)
      const afterDelete = service.getAll().length
      expect(afterDelete).toBeLessThan(beforeMovies)
    })
    it('404 리턴을 받아야 됩니다', () => {
      try {
        service.deleteOne(1000)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000
      })
      const afterCreate = service.getAll().length
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })

  describe('update', () => {
    it('update movie!', () => {
      service.create({
        title: 'test movie',
        genres: ['test'],
        year: 2000
      })

      service.update(1, {
        title: 'change movie',
        genres: ['change test'],
        year: 2001
      })
      const infoMovie = service.getOne(1)

      expect(infoMovie.title).toEqual('change movie')
      expect(infoMovie.genres[0]).toEqual('change test')
      expect(infoMovie.year).toEqual(2001)
    })

    it('update 404 return', () => {
      try {
        service.update(100, {
          title: 'change movie'
        })
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })
})
