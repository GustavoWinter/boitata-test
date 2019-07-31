class Posts {
  constructor({ links }) {
    this.posts = links.map((link, index) => new ListItem({ link, index }))
  }
}
