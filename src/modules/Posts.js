import ListItem from 'modules/ListItem'

export default class Posts {
  constructor() {
    this.posts = null
  }

  initialize({ links }) {
    this.posts = links.map((link, index) => new ListItem({ link, index }))
    document.getElementById('search').addEventListener("keyup", e => this.search(e))
  }

  static normalizeJson(link) {
    console.log(link)
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
      document.getElementById("posts").innerHTML = "";
      const { posts } = this
      const links = posts.sort((a, b) => a[filter] > b[filter] ? -1 : 1)
      this.posts = links.map((link, index) => new ListItem({ link: Posts.normalizeJson(link), index: link.id }))
    } catch (e) {
      console.log(e)
    }
  }

  setPost(link = null) {
    if(!!link) {
      const { posts } = this
      const index = posts.length + 1
      const newListItem = new ListItem({ link, index })
      this.posts = posts.concat(newListItem)
    }
  }

  getPost() {
    return this.posts
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
}

export let posts = new Posts()
