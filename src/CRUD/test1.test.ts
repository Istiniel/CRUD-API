import { users } from '../store'
import { type User } from '../types'

const mockUser: Partial<User> = {
  username: 'John the second',
  age: 2,
  hobbies: ['fishing', 'swimming'],
}

describe('first case', () => {
  test('should handle first case', async () => {
    const initialUsers = await (await fetch('http://127.0.0.1:9000/api/users')).json()
    expect(initialUsers).toEqual(users)

    const newUser = (await (
      await fetch('http://127.0.0.1:9000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(mockUser),
      })
    ).json()) as User

    const user = (await (
      await fetch(`http://127.0.0.1:9000/api/users/${newUser.id}`)
    ).json()) as User

    expect(user.username).toEqual(mockUser.username)

    const updatedUser = { ...user, username: 'John the Updated' }
    const putUpdatedUser = (await (
      await fetch(`http://127.0.0.1:9000/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(updatedUser),
      })
    ).json()) as User

    expect(putUpdatedUser.username).toEqual('John the Updated')

    const deletionConfirmation = await (
      await fetch(`http://127.0.0.1:9000/api/users/${updatedUser.id}`, {
        method: 'DELETE',
      })
    ).text()

    expect(deletionConfirmation).toEqual('User is deleted!')

    const noUserInfo = await (
      await fetch(`http://127.0.0.1:9000/api/users/${updatedUser.id}`)
    ).text()

    expect(noUserInfo).toEqual('Such a user does not exist')
  })
})
