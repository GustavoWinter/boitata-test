import Posts from 'modules/Posts'
import { showElement } from 'modules/Helpers/filters'
const html = require('fs').readFileSync('dist/index.html').toString();

describe('Filters', () => {
  describe('#Show Element', () => {
    test('toggle class display-none - remove', () => {
      document.documentElement.innerHTML = "<div id='filters' class='display-none'>Test</div>"
      showElement()
      const divTest = document.getElementById('filters').classList.contains('display-none')
      expect(divTest).toBe(false)
    })

    test('toggle class display-none - add', () => {
      document.documentElement.innerHTML = "<div id='filters'>Test</div>"
      showElement()
      const divTest = document.getElementById('filters').classList.contains('display-none')
      expect(divTest).toBe(true)
    })
  })
})
