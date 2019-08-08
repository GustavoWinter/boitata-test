import { posts } from '../modules/Posts'
import { links as mockedLinks } from 'app/mocks/links'

export const get = {
  path: '5a6bc16631000078341b8b77',
  method: 'GET',
  auth: false,
  handleResponse: async response =>  {
    const { links } = await response.json()
    posts.initialize({ links })
  },
  handleError:  error => {
    posts.initialize({ links: mockedLinks })
    console.log('Error on API request', error)
  }
}
