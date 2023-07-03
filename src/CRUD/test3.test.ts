import { type User } from '../types'

const mockUser: User = {
  // id is reduntant, id will be generated server side
  id: '794820dd-c6ec-42dd-bac4-3ad0361535e1',
  username: 'John the second',
  age: 2,
  hobbies: ['fishing', 'swimming'],
}

describe('third case', () => {
  test('should handle third case', async () => {
    const newUser = (await (
      await fetch('http://127.0.0.1:9000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(mockUser),
      })
    ).json()) as User

    const noUserInfo = await (await fetch(`http://127.0.0.1:9000/api/users/${mockUser.id}`)).text()
    expect(noUserInfo).toEqual('Such a user does not exist')

    const deletionConfirmation = await (
      await fetch(`http://127.0.0.1:9000/api/users/${newUser.id}`, {
        method: 'DELETE',
      })
    ).text()

    expect(deletionConfirmation).toEqual('User is deleted!')
  })
})
