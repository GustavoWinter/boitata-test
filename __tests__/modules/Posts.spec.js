import { posts } from 'modules/Posts'
import { links as mockedLinks } from 'mocks//links'
const html = require('fs').readFileSync('dist/index.html').toString();

describe('Posts Class', () => {
  beforeAll(() => {
    document.documentElement.innerHTML = html;
    posts.initialize({ links: mockedLinks })
  })

  describe('#Initialize', () => {
    test('should create all posts with list itens', () => {
      expect(document.querySelectorAll('[data-post-li]').length).toBe(mockedLinks.length)
    })
  })

  describe('#Search', () => {
    test('should not be visibile on initialize', () => {
      const feedbackElement = document.getElementById('no-post-found')
        .classList.contains('display-none')
      expect(feedbackElement).toBe(true)
    })

    test('should appears if no result was found', () => {
      const e  = { target: { value: 'Unknown' }}
      posts.search(e)
      const feedbackElement = document.getElementById('no-post-found')
        .classList.contains('display-none')
      expect(feedbackElement).toBe(false)
    })

    test('post that not match should not appears on screen', () => {
      const [ firstPost, secondPost ] = mockedLinks
      posts.initialize({ links: [ firstPost, secondPost ]})

      const e = { target: { value: firstPost.meta.author }}
      posts.search(e)
      expect(
        document.getElementById('list-item-1').classList.contains('display-none')
      ).toBe(true)
      expect(
        document.getElementById('list-item-0').classList.contains('display-none')
      ).toBe(false)
    })
  })

  describe('#FilterBy', () => {
    describe('By comments', () => {
      beforeAll(() => {
        document.querySelector('ul').innerHTML = ""
        const [ postA, postB ] = mockedLinks
        postA.comments = 0
        postB.comments = 25
        posts.initialize({ links: [postA, postB]})
      })
      test('when no filters are selected keep the original order', () => {
        const li = document.querySelectorAll('[data-post-li]')

        expect(li[0].id).toBe('list-item-0')
        expect(li[1].id).toBe('list-item-1')
      })

      test('the first will have less number of comments than the other', () => {
        const li = document.querySelectorAll('[data-post-li]')

        const firstPost = li[0].querySelector('[data-comments]').getAttribute('data-comments'),
              secondPost = li[1].querySelector('[data-comments]').getAttribute('data-comments')
        expect(firstPost < secondPost).toBe(true)
      })

      test('after select the filter the order should change', () => {
        posts.filterBy('comments')
        const li = document.querySelectorAll('[data-post-li]')

        expect(li[0].id).toBe('list-item-1')
        expect(li[1].id).toBe('list-item-0')
      })

      test('the first comment should have more comments than the others', () => {
        posts.filterBy('comments')
        const li = document.querySelectorAll('[data-post-li]')

        const highest = li[0].querySelector('[data-comments]').getAttribute('data-comments'),
              lowest = li[1].querySelector('[data-comments]').getAttribute('data-comments')

        expect(highest > lowest).toBe(true)
      })
    })

    describe('By Up Votes', () => {
      beforeAll(() => {
        document.querySelector('ul').innerHTML = ""
        const [ postA, postB ] = mockedLinks
        postA.upvotes = 0
        postB.upvotes = 25
        posts.initialize({ links: [postA, postB]})
      })
      test('when no filters are selected keep the original order', () => {
        const li = document.querySelectorAll('[data-post-li]')

        expect(li[0].id).toBe('list-item-0')
        expect(li[1].id).toBe('list-item-1')
      })

      test('the first will have less number of votes than the other', () => {

        const firstPost = document.getElementById('vote-0-span').textContent,
              secondPost = document.getElementById('vote-1-span').textContent

        expect(firstPost < secondPost).toBe(true)
      })

      test('after select the filter the order should change', () => {
        posts.filterBy('upVotes')
        const li = document.querySelectorAll('[data-post-li]')

        expect(li[0].id).toBe('list-item-1')
        expect(li[1].id).toBe('list-item-0')
      })

      test('the first comment should have more comments than the other', () => {
        posts.filterBy('upVotes')

        const highest = document.getElementById('vote-1-span').textContent,
              lowest = document.getElementById('vote-0-span').textContent

        expect(highest > lowest).toBe(true)
      })
    })

    describe('By Date', () => {
      // It'll generate a new date by daysAgo.
      // Example: if daysAgo = 2, i'll generate a new Date that occurs two days ago.
      const generateDate = daysAgo => new Date(
        new Date().setDate(new Date().getDate()-daysAgo)
      ).getTime()

      beforeAll(() => {
        document.querySelector('ul').innerHTML = ""
        const [ postFromDaysAgo, postFromCurrentDate ] = mockedLinks
        postFromDaysAgo.created_at = generateDate(2) // Date from two days agos
        postFromCurrentDate.created_at = generateDate(0) // Today date
        posts.initialize({ links: [postFromDaysAgo, postFromCurrentDate]})
      })
      test('when no filters are selected keep the original order', () => {
        const li = document.querySelectorAll('[data-post-li]')

        expect(li[0].id).toBe('list-item-0')
        expect(li[1].id).toBe('list-item-1')
      })

      test('the first will be the last post created', () => {
        const li = document.querySelectorAll('[data-post-li]')

        const daysAgo = li[0].querySelector('[data-time-0]').getAttribute('data-time-0'),
              currentDate = li[1].querySelector('[data-time-1]').getAttribute('data-time-1')
        expect(daysAgo < currentDate).toBe(true)
      })

      test('after select the filter the order should change', () => {
        posts.filterBy('comments')
        const li = document.querySelectorAll('[data-post-li]')

        expect(li[0].id).toBe('list-item-1')
        expect(li[1].id).toBe('list-item-0')
      })

      test('the first comment should have more comments than the others', () => {
        posts.filterBy('comments')
        const li = document.querySelectorAll('[data-post-li]')
        const daysAgo = document.querySelector('[data-time-0]').getAttribute('data-time-0'),
              currentDate = document.querySelector('[data-time-1]').getAttribute('data-time-1')

        expect(currentDate > daysAgo).toBe(true)
      })
    })

    describe('Reseting', () => {
      beforeAll(() => {
        document.querySelector('ul').innerHTML = ""
        const [ postA, postB ] = mockedLinks
        postA.comments = 0
        postB.comments = 25
        posts.initialize({ links: [postA, postB]})
      })
      test('the dom will start in the normal order', () => {
        const li = document.querySelectorAll('[data-post-li]')

        expect(li[0].id).toBe('list-item-0')
        expect(li[1].id).toBe('list-item-1')
      })

      test('after apply the filter the list order will change', () => {
        posts.filterBy('comments')
        const li = document.querySelectorAll('[data-post-li]')

        expect(li[0].id).toBe('list-item-1')
        expect(li[1].id).toBe('list-item-0')
      })

      test('the order should be reset', () => {
        posts.filterBy('reset')
        const li = document.querySelectorAll('[data-post-li]')

        expect(li[0].id).toBe('list-item-0')
        expect(li[1].id).toBe('list-item-1')
      })
    })
  })

  describe('#syncUpVote', () => {

    test('it should sync the up vote in the orignal order and the current order', () => {
      const id = 1,
            upVotes = 123456
      posts.syncUpVote({ id, upVotes})
      const currentList = posts.posts,
            originalOrder = posts.originalOrder

      expect(currentList[id].upVotes).toBe(upVotes)
      expect(originalOrder[id].upvotes).toBe(upVotes)
    })

    test('it should sync instead a filter is being applied or not', () => {
      const id = 1,
            upVotes = 123456

      posts.filterBy('comments')
      posts.syncUpVote({ id, upVotes })
      const postFromCurrentList = posts.posts.find(post => post.id === id),
            postInOriginalOrder = posts.originalOrder.find(post => post.id === id)

      expect(postFromCurrentList.upVotes).toBe(upVotes)
      expect(postInOriginalOrder.upvotes).toBe(upVotes)
    })

    test('it should persist after the filter was reset', () => {
      const id = 1,
            upVotes = 123456

      posts.filterBy('comments')
      posts.syncUpVote({ id, upVotes })
      posts.filterBy('reset')

      const postFromCurrentList = posts.posts.find(post => post.id === id),
            postInOriginalOrder = posts.originalOrder.find(post => post.id === id)

      expect(postFromCurrentList.upVotes).toBe(upVotes)
      expect(postInOriginalOrder.upvotes).toBe(upVotes)
    })
  })

  describe('#setPost', () => {
    beforeAll(() => {
      posts.initialize({ links: mockedLinks })
      posts.setPost(mockedLinks[0])
    })

    test('the size of posts should be increase', () => {
      expect(posts.posts.length).toBe(mockedLinks.length + 1)
    })

    test('the size of posts should be increase', () => {
      expect(posts.originalOrder.length).toBe(mockedLinks.length + 1)
    })
  })
})
