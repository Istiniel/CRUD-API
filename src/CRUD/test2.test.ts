import { type User } from '../types'

const userNoAge: Partial<User> = {
  username: 'John the second',
  hobbies: ['fishing', 'swimming'],
}

describe('second case', () => {
  test('should handle second case', async () => {
    const invalidUrlMessage = await (await fetch('http://127.0.0.1:9000/api/pizza')).text()
    expect(invalidUrlMessage).toEqual('Error! Non-existing route')

    const invalidIdMessage = await (await fetch('http://127.0.0.1:9000/api/users/wrong-id')).text()
    expect(invalidIdMessage).toEqual('Error! ID should be presented in uuid v4 format')

    const missingFieldsMessage = await (
      await fetch('http://127.0.0.1:9000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(userNoAge),
      })
    ).text()
    expect(missingFieldsMessage).toEqual('User does not contain all the necessary fields')

    const invalidJsonMessage = await (
      await fetch('http://127.0.0.1:9000/api/users/294860dd-c6ec-42dd-bac4-3ad0361532e1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify('not a JSON'),
      })
    ).text()
    expect(invalidJsonMessage).toEqual('Non correct JSON format request body')
  })
})
