import { type User } from '../types'

export let users: User[] = [
  {
    id: '294860dd-c6ec-42dd-bac4-3ad0361532e1',
    username: 'John the first',
    age: 1,
    hobbies: ['fishing'],
  },
  {
    id: '2087b628-bdb4-45a8-8d5d-3d84d6334094',
    username: 'John the second',
    age: 2,
    hobbies: ['fishing', 'swimming'],
  },
  {
    id: '653bf735-82b5-4a7b-9250-dd50e65c04be',
    username: 'John the third',
    age: 3,
    hobbies: ['fishing', 'swimming', 'hunting'],
  },
]

export function updateUserInfo(user: User): void {
  const id = user.id
  users = [...users.filter((user) => user.id !== id), user]
}

export function deleteUser(id: string): void {
  users = users.filter((user) => user.id !== id)
}

// {
//   "username": "John the first!!!",
//   "age": 1123,
//   "hobbies": ["fishing!!!!!"]
// }

// put
// id 294860dd-c6ec-42dd-bac4-3ad0361532e1
// {
//   "username": "JOOOOOOHN",
//   "age": 2354,
//   "hobbies": ["FIIIISH"]
// }
