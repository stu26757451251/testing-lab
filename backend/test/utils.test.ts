import { describe, expect, it } from 'vitest'
import { myCustomAdd, fabonacci } from '../src/utils/math'
import { fail } from 'assert'

describe('utils testing', () => {
  describe('add function', () => {
    it('should return 3 when add 1 and 2', () => {
      // act
      const result = myCustomAdd(1, 2)

      // assert
      expect(result).toBe(3)
    })
    it('should return 5 when add 2 and 3', () => {
      // TODO: fix the test
      fail('not implemented')
    })
  })

  describe('fabonacci function', () => {
    it('should return 1 when n is 1', () => {
      expect(fabonacci(1)).toBe(1)
    })
    it('should return 1 when n is 2', () => {
      // TODO: fix the test
      fail('not implemented')
    })
    it('should return 2 when n is 3', () => {
      // TODO: fix the test
      fail('not implemented')
    })
  })
})
