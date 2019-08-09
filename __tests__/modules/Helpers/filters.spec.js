import Posts from 'modules/Posts'
import { showElement } from 'modules/Helpers/filters'
const html = require('fs').readFileSync('dist/index.html').toString();

describe('Filters', () => {
  describe('#Show Element', () => {
    beforeAll(() => {
      document.documentElement.innerHTML = html
    })

    test('toggle class open-filters - remove', () => {
      showElement()
      const divTest = document.getElementById('filters').classList.contains('open-filters')
      expect(divTest).toBe(false)
    })

    test('toggle class open-filters - add', () => {
      showElement()
      const divTest = document.getElementById('filters').classList.contains('open-filters')
      expect(divTest).toBe(true)
    })
  })
})
