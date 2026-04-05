import { describe, expect, it } from 'vitest'
import { myCustomAdd, fabonacci } from '../src/utils/math'

describe('utils testing', () => {
  describe('add function', () => {
    it('should return 3 when add 1 and 2', () => {
      // arrange
      const a = 1
      const b = 2

      // act
      const result = myCustomAdd(a, b)

      // assert
      expect(result).toBe(3)
    })
    it('should return 5 when add 2 and 3', () => {
      expect(myCustomAdd(2, 3)).toBe(5)
    })
  })

  describe('fabonacci function', () => {
    it('should return 1 when n is 1', () => {
      // TODO: fix the test
      expect.fail('not implemented')
    })
    it('should return 1 when n is 2', () => {
      // TODO: fix the test
      expect.fail('not implemented')
    })
    it('should return 2 when n is 3', () => {
      // TODO: fix the test
      expect.fail('not implemented')
    })
  })
})
