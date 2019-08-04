const createNode = DOMHandler.createNode
const append = DOMHandler.append
const appendAll = DOMHandler.appendAll

class ListItem {
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
    element = 'posts'
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
    this.initializeComponent()
  }

  createUpVoteButton() {
    let button = createNode('button')
    button.id = `vote-${this.id}`
    button.innerHTML = '<i class="fa fa-chevron-up" style="color:red"></i>'
    button.classList.add('vote-icon')
    button.addEventListener("click", () => this.voteUp())
    return button
  }

  static showElement(id, value = true ) {
    const display = (value ? 'flex' : 'none')
    document.getElementById(`list-item-${id}`).style.display = display
  }

  voteUp() {
    let { upVotes, id } = this,
        element = document.querySelector(`#vote-${id}-span`)
    element.classList.add('defaultText')
    upVotes += 1
    this.upVotes = upVotes

    element.innerHTML = upVotes
  }

  initializeComponent() {
    let li = createNode('li')
    li.id = `list-item-${this.id}`
    li.classList.add('simple-row', 'text')

    this.voteComponent(li)
    this.bodyComponent(li)

    append(this.element, li)
  }

  voteComponent(parent) {
    let span = createNode('span'),
        container = createNode('div')

    span.innerHTML = this.upVotes
    span.id = `vote-${this.id}-span`
    container.classList.add('simple-column', 'text', 'vote-container')

    appendAll(container, [
      this.createUpVoteButton(),
      span,
    ])
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

    container.classList.add('simple-column', 'text')

    appendAll(container, [
      spanSite,
      spanTitle,
      footer,
    ])
    append(parent, container)
  }

  footerComponent() {
    const { category, comments, createdAt, author } = this

    let spanCategory = createNode('span'),
        spanName = createNode('span'),
        spanTime = createNode('span'),
        spanComments = createNode('comments'),
        container = createNode('div')

    container.classList.add('tempFooter', 'text')

    spanCategory.innerHTML = category
    spanName.innerHTML = author
    spanTime.innerHTML = normalizeDate(createdAt)
    spanComments.innerHTML = comments

    appendAll(container, [
      spanCategory,
      spanName,
      spanTime,
      spanComments
    ])

    return container
  }

  toString(){
    const { category, comments, createdAt, author, title, url, upVotes, } = this
    return category.concat(` ${comments} ${author} ${title} ${url} ${upVotes}`).toLowerCase()
  }
}
