const createNode = DOMHandler.createNode
const append = DOMHandler.append

class Custom {
  constructor({ link, element = 'authors' }) {
    this.element = document.getElementById(element)
    this.link = link
  }

  static upVoteButton() {
    let span = createNode('span')
    span.innerHTML = '^'
    return span
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

    span.innerHTML = this.link.upvotes
    container.classList.add('simple-column')

    append(container, Custom.upVoteButton())
    append(container, span)
    append(parent, container)
  }

  bodyComponent(parent) {
    const { meta: { url, title }} = this.link
    let spanSite = createNode('span'),
        spanTitle = createNode('span'),
        container = createNode('div')

    const footer = this.footerComponent()

    spanSite.innerHTML = url
    spanTitle.innerHTML = title
    container.classList.add('simple-column')
    append(container, spanSite)
    append(container, spanTitle)
    append(container, footer)
    append(parent, container)
  }

  footerComponent() {
    const { category, comments, created_at: time, meta: { author }} = this.link

    let spanCategory = createNode('span'),
        spanName = createNode('span'),
        spanTime = createNode('span'),
        spanComments = createNode('comments'),
        container = createNode('div')

    spanCategory.innerHTML = category
    spanName.innerHTML = author
    spanTime.innerHTML = time
    spanComments.innerHTML = comments

    append(container, spanCategory)
    append(container, spanName)
    append(container, spanTime)
    append(container, spanComments)

    return container
  }
}

console.log(links)

links.map(link => {
  const x = new Custom({ link })
  x.initializeComponent()
  return x
})
const custom = new Custom({ link: links[0]})
custom.initializeComponent()
