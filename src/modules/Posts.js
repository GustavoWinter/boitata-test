import ListItem from 'modules/ListItem'

export default class Posts {
  constructor() {
    this.posts = null
  }

  initialize({ links }) {
    this.posts = links.map((link, index) => new ListItem({ link, index }))
    document.getElementById('search').addEventListener("keyup", e => this.search(e))
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
