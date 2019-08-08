import Posts from 'modules/Posts'
import { categories, getCategory } from 'modules/Helpers/categories'
const html = require('fs').readFileSync('dist/index.html').toString();

describe('Filters', () => {
  describe('#getCategory', () => {
    test('return category by name', () => {
      expect(getCategory('ux_ui')).toBe(categories.ux_ui)
    })

    test('return category by label', () => {
      expect(getCategory('UX Theory')).toBe(categories.ux_ui)
    })

    test('should create a new category', () => {
      getCategory('new_category', () => {
        expect(Object.keys(categories).contains('new_category')).toBe(true)
      })
    })
  })
})
