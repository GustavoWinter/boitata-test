import ListItem from 'modules/ListItem'
import { links as mockedLinks } from 'mocks//links'
const html = require('fs').readFileSync('dist/index.html').toString();

describe('ListItem Class', () => {
  beforeAll(() => {
    document.documentElement.innerHTML = html;
    new ListItem({link: mockedLinks[0], index: 0 })
  })

  describe('#Initialize', () => {
    test('should append the list item to the dom', () => {
      expect(document.querySelectorAll('[data-post-li]').length).toBe(1)
    })
  })

  describe('#showElement', () => {
    test('should change the data-item attribute to show', () => {
      ListItem.showElement(0, true)
      const attributeValue = document.getElementById('list-item-0').getAttribute('data-item')
      expect(attributeValue).toBe('show')
    })

    test('should change the data-item attribute to hide', () => {
      ListItem.showElement(0, false)
      const attributeValue = document.getElementById('list-item-0').getAttribute('data-item')
      expect(attributeValue).toBe('hide')
    })
  })

  describe('#showEmptyResearch', () => {
    test('should not appears on screen on initialize', () => {
      expect(
        document.getElementById('no-post-found').classList.contains('display-none')
      ).toBe(true)
    })

    test('should show the feedback message', () => {
      ListItem.showEmptyResearch()
      expect(
        document.getElementById('no-post-found').classList.contains('display-none')
      ).toBe(false)
    })
  })
})
