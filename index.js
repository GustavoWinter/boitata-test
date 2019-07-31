const createNode = DOMHandler.createNode
const append = DOMHandler.append

class Custom {
  constructor({ link: {
      category,
      comments,
      created_at: createdAt,
      meta: {
        author,
        title,
        url,
      },
      upvotes,
    },
    index: id,
    element = 'authors'
  }) {
    this.category = category,
    this.comments = comments,
    this.createdAt = createdAt,
    this.author = author,
    this.title = title,
    this.url = url,
    this.upVotes = upvotes,
    this.element = document.getElementById(element)
    this.id = id
  }

  createUpVoteButton() {
    let button = createNode('button')
    button.id = `vote-${this.id}`
    button.innerHTML = '^'
    button.addEventListener("click", () => this.voteUp())
    return button
  }

  voteUp() {
    let { upVotes, id } = this,
        element = document.querySelector(`#vote-${id}-span`)
    upVotes += 1
    this.upVotes = upVotes

    element.innerHTML = upVotes
  }

  initializeComponent() {
    let li = createNode('li')
    li.classList.add('simple-row')

    this.voteComponent(li)
    this.bodyComponent(li)

    append(this.element, li)
  }

  voteComponent(parent) {
    let span = createNode('span'),
        container = createNode('div')

    span.innerHTML = this.upVotes
    span.id = `vote-${this.id}-span`
    container.classList.add('simple-column')

    append(container, this.createUpVoteButton())
    append(container, span)
    append(parent, container)
  }

  bodyComponent(parent) {
    const { url, title } = this,
          footer = this.footerComponent()

    let spanSite = createNode('span'),
        spanTitle = createNode('span'),
        container = createNode('div')


    spanSite.innerHTML = url
    spanTitle.innerHTML = title

    container.classList.add('simple-column')

    append(container, spanSite)
    append(container, spanTitle)
    append(container, footer)
    append(parent, container)
  }

  footerComponent() {
    const { category, comments, createdAt, author } = this

    let spanCategory = createNode('span'),
        spanName = createNode('span'),
        spanTime = createNode('span'),
        spanComments = createNode('comments'),
        container = createNode('div')

    container.classList.add('tempFooter')

    spanCategory.innerHTML = category
    spanName.innerHTML = author
    spanTime.innerHTML = createdAt
    spanComments.innerHTML = comments

    append(container, spanCategory)
    append(container, spanName)
    append(container, spanTime)
    append(container, spanComments)

    return container
  }
}

console.log(links)

links.map((link, index) => new Custom({ link, index }).initializeComponent())
