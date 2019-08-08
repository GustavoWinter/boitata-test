import ListItem from 'modules/ListItem'

export default class Posts {
  constructor() {
    this.posts = []
    this.originalOrder = []
  }

  initialize({ links }) {
    this.posts = links.map((link, index) => new ListItem({ link, index }))
    // Orignal Order will be use to reset the list after filters are applied
    this.originalOrder = links.map((link, index) => ({ ...link, id: index }))
    document.getElementById('search').addEventListener("keyup", e => this.search(e))
  }

  static normalizeJson(link) {
    const { author, title, url, category, comments, createdAt, upVotes } = link
    return {
      meta: {
        author,
        title,
        url,
      },
      category,
      comments,
      created_at: createdAt,
      upvotes: upVotes,
    }
  }

  filterBy(filter = 'upVotes') {
    try {
      const { posts, originalOrder } = this
      document.getElementById("posts").innerHTML = "";
      if(filter === 'reset') {
        this.posts = originalOrder.map((link, index) => new ListItem({ link, index }))
      } else {
        const links = posts.sort((a, b) => a[filter] > b[filter] ? -1 : 1)
        this.posts = links.map(link => new ListItem({ link: Posts.normalizeJson(link), index: link.id }))
      }
    } catch (e) {
      console.log(e)
    }
  }

  setPost(link = null) {
    if(!!link) {
      const { posts, originalOrder } = this
      const index = posts.length + 1
      const newListItem = new ListItem({ link, index })
      this.posts = posts.concat(newListItem)

      //Save the new post in the originalOrder
      link.id = index
      originalOrder.push(link)
    }
  }

  getPosts() {
    return this.posts
  }

  getOriginalOrder() {
    return this.originalOrder
  }

  //this is search all fields that can inclued the search str
  search(e) {
    if(!!e.target) {
      const value = e.target.value.toLowerCase()
      this.posts.forEach(post => {
        const condition = post.toString().includes(value)
        ListItem.showElement(post.id, condition)
      })
    }
    ListItem.showEmptyResearch()
  }

  // it'll keep syncronize the vote number with the List Item class
  syncUpVote({ id, upVotes }) {
    const { posts, originalOrder } = this

    let postIndex = posts.findIndex( post => post.id === id)
    let originalPostIndex = originalOrder.findIndex( post => post.id === id)
    this.posts[postIndex].upVotes = upVotes
    this.originalOrder[originalPostIndex].upvotes = upVotes
  }
}

export let posts = new Posts()
