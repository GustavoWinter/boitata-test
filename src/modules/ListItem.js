import DOMHandler from 'modules/DOMHandler'
import { posts } from 'modules/Posts'
import { normalizeDate } from 'modules/Helpers/time'
import { getCategory } from 'modules/Helpers/categories'

import noPhoto from 'assets/users/no-photo.jpeg'
import userProfile from 'assets/users/user-profile.jpg'

const append = DOMHandler.append,
      appendAll = DOMHandler.appendAll,
      createNode = DOMHandler.createNode,
      cloneToEncapsulate = DOMHandler.cloneToEncapsulate,
      cloneAndEncapsulateAll = DOMHandler.cloneAndEncapsulateAll

const defaultStyles = [ 'post-info', 'defaultText']

export default class ListItem {
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
    const { color, label } = getCategory(category)
    this.category = label,
    this.categoryColor = color,
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

  static showElement(id, value = true ) {
    const li = document.getElementById(`list-item-${id}`)
    value
      ? (li.setAttribute('data-item', 'show'), li.classList.remove('display-none'))
      : (li.setAttribute('data-item', 'hide'), li.classList.add('display-none'))
  }

  static showEmptyResearch() {
    const feedback = document.getElementById('no-post-found')
    !document.querySelectorAll('[data-item="show"]').length
      ? feedback.classList.remove('display-none')
      : feedback.classList.add('display-none')
  }

  createUpVoteButton() {
    let button = createNode('button')
    button.id = `vote-${this.id}`
    button.innerHTML = '<i class="fa fa-chevron-up" style="color:red"></i>'
    button.classList.add('vote-icon')
    button.addEventListener("click", () => this.voteUp())
    return button
  }

  voteUp() {
    let { upVotes, id } = this,
        element = document.querySelector(`#vote-${id}-span`)
    upVotes += 1
    this.upVotes = upVotes
    element.innerHTML = upVotes

    posts.syncUpVote({ id, upVotes })
  }

  initializeComponent() {
    let li = createNode('li')
    li.id = `list-item-${this.id}`
    li.setAttribute('data-item', 'show')
    li.setAttribute('data-post-li', '')
    li.classList.add('simple-row', 'text', 'default-posts-margin')

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

    spanSite.innerHTML = url.toUpperCase()
    spanTitle.innerHTML = title

    const siteContainer = cloneToEncapsulate(container, spanSite, ['body-site-grid']),
          titleContainer = cloneToEncapsulate(container, spanTitle, ['body-title-grid'])

    spanSite.classList.add('font-family-site')
    container.classList.add('body-post-grid', 'text')

    appendAll(container, [ siteContainer, titleContainer, footer ])
    append(parent, container)
  }

  footerComponent() {
    const { category, comments, createdAt, author, id } = this
    const postDate = normalizeDate(createdAt)

    // Create all elements
    let spanCategory = createNode('span'),
        spanName = createNode('span'),
        spanTime = createNode('span'),
        spanComments = createNode('span'),
        spanEdit = createNode('span'),
        container = createNode('div'),
        spanBullet = createNode('span'),
        spanBallon = createNode('i'),
        userImage = createNode('img')

    // Add classes to the elements
    spanCategory.classList.add('text-category')
    spanName.classList.add('info-text')
    spanTime.classList.add('info-time-text')
    spanComments.classList.add('info-text')
    spanEdit.classList.add('info-text')
    spanBullet.classList.add('bullet')
    spanBallon.classList.add('fa', 'fa-comment', 'ballon')
    userImage.classList.add('post-user-image')

    // Set src photo and id
    userImage.src = userPhoto(author)
    userImage.id = 'post-user-photo'

    // Set data attribute for comments
    spanComments.setAttribute('data-comments', comments)

    // Set styles
    spanBallon.style.color = 'red'
    spanCategory.style.backgroundColor = this.categoryColor

    const [
      containerCategory,
      containerUserImage,
      containerName,
      containerTime,
      containerComments,
    ] = cloneAndEncapsulateAll(
      container,
      [ spanCategory, userImage, spanName, spanTime, spanComments ],
      [
        [ ...defaultStyles, 'border-padding' ],
        [],
        [ ...defaultStyles ],
        [ ...defaultStyles ],
        [ ...defaultStyles ],
      ]
    )

    container.classList.add('body-footer-grid', 'text')
    spanCategory.innerHTML = category
    spanName.innerHTML = author
    spanTime.innerHTML = postDate
    spanComments.innerHTML = `${comments} comments`
    if(author === 'Danil Ishutin') spanEdit.innerHTML = 'edit'
    spanBullet.innerHTML = '&bull;'

    spanTime.setAttribute(`data-time-${id}`, createdAt)

    append(containerComments, spanEdit)
    appendAll(container, [
      containerCategory,
      containerUserImage,
      containerName,
      containerTime,
      spanBullet,
      spanBallon,
      containerComments,
    ])

    return container
  }

  toString(){
    const { category, comments, createdAt, author, title, url, upVotes, } = this
    return category.concat(` ${comments} ${author} ${title} ${url} ${upVotes}`).toLowerCase()
  }
}


const userPhoto = author =>
  author === 'Danil Ishutin'
    ? userProfile
    : noPhoto
