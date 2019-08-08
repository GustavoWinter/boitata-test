import Posts from 'modules/Posts'
import { handleModal, onSubmit } from 'modules/Helpers/modal'
const html = require('fs').readFileSync('dist/index.html').toString();

describe('Modal', () => {
  beforeAll(() => {
    document.documentElement.innerHTML = html;
  })

  describe('display behavior', () => {
    test('should initiliaze with display none', () => {
      const value = document.getElementById('modal-background').classList.contains('display-none')
      expect(value).toBe(true)
    })

    test('after click it should me removed', () => {
      handleModal()
      const value = document.getElementById('modal-background').classList.contains('display-none')
      expect(value).toBe(false)
    })
  })

  /* Click is not working in jest enviroment*/
  
  // describe('#onSubmit', () => {
  //   beforeEach(() => {
  //     document.getElementById('modal-post-name').value = 'Test name'
  //     document.getElementById('modal-post-url').value = 'www.urlname.com'
  //     document.getElementById('list-category').value = 'ux_ui'
  //     document.getElementById('modal-post-textarea').value = 'Lorem Ipsum...'
  //   })
  //
  //   test('should increase the count of posts', () => {
  //     document.getElementById('modal-form').submit()
  //     expect(document.querySelectorAll('li').length).toBe(1)
  //   })
  // })
})
