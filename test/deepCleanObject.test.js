import assert from 'assert'

import deepCleanObject from '../deepCleanObject'

describe('deepCleanObject', () => {
  const object = { a: 'something', b: [{ id: '1001', type: 'Regular' }] }

  it('should clean simple objects', () => {
    const simpleObject = { a: 'something', b: 'something else' }
    const expected = { a: '', b: '' }

    assert.deepStrictEqual(deepCleanObject(simpleObject), expected)
  })

  it('should clean an object even if it contains array of objects', () => {
    const expected = { a: '', b: [{ id: '', type: '' }] }

    assert.deepStrictEqual(deepCleanObject(object), expected)
  })

  it('should clean an object even if it contains function', () => {
    const objectWithfunction = { func: () => 'a', x: object }
    const expected = {
      func: '',
      x: {
        a: '',
        b: [
          {
            id: '',
            type: ''
          }
        ]
      }
    }

    assert.deepStrictEqual(deepCleanObject(objectWithfunction), expected)
  })

  it('should clean complex nested objects', () => {
    const nestedObject = {
      items: {
        item: [
          {
            id: '0001',
            type: 'donut',
            name: 'Cake',
            ppu: 0.55,
            batters: {
              batter: [
                { id: '1001', type: 'Regular' },
                { id: '1002', type: 'Chocolate' },
                { id: '1003', type: 'Blueberry' },
                { id: '1004', type: "Devil's Food" }
              ]
            },
            topping: [
              { id: '5001', type: 'None' },
              { id: '5002', type: 'Glazed' },
              { id: '5005', type: 'Sugar' },
              { id: '5007', type: 'Powdered Sugar' },
              { id: '5006', type: 'Chocolate with Sprinkles' },
              { id: '5003', type: 'Chocolate' },
              { id: '5004', type: 'Maple' }
            ]
          }
        ]
      }
    }
    const expected = {
      items: {
        item: [
          {
            id: '',
            type: '',
            name: '',
            ppu: '',
            batters: {
              batter: [
                { id: '', type: '' },
                { id: '', type: '' },
                { id: '', type: '' },
                { id: '', type: '' }
              ]
            },
            topping: [
              { id: '', type: '' },
              { id: '', type: '' },
              { id: '', type: '' },
              { id: '', type: '' },
              { id: '', type: '' },
              { id: '', type: '' },
              { id: '', type: '' }
            ]
          }
        ]
      }
    }

    assert.deepStrictEqual(deepCleanObject(nestedObject), expected)
  })

  it('should not process if the argument is not a valid object', () => {
    assert.strictEqual(deepCleanObject(null), null)
    assert.deepStrictEqual(deepCleanObject([1, 2, 3]), ['', '', ''])
    assert.equal(deepCleanObject('string'), 'string')
    assert.strictEqual(deepCleanObject(arguments), arguments)
    assert.strictEqual(deepCleanObject(Error), Error)
    assert.strictEqual(deepCleanObject(Math), Math)
  })

  it('should not process `undefined`', () => {
    assert.equal(deepCleanObject(undefined), undefined)
  })

  it('should not process Boolean arguments', () => {
    assert.equal(deepCleanObject(true), true)
    assert.equal(deepCleanObject(false), false)
  })

  it('should not process a function as an argument', () => {
    function Foo(a) {
      this.a = 1
    }
    assert.equal(deepCleanObject(Foo), Foo)
  })
})
