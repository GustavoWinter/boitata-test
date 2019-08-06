import DOMHandler from 'modules/DOMHandler'
import { posts } from 'modules/Posts'
import { categories } from 'modules/Helpers/categories'

export const handleModal = () => {
  let modal = document.getElementById('modal-background')
  modal.addEventListener('click', (e) => hideModal(e.target.id, modal))
  modal.style.display = 'flex'
  appendCategories()
}

const appendCategories = () => {
  const list = document.getElementById('list-category')
  Object.keys(categories).forEach(category => {
    const option = DOMHandler.createNode('option')
    option.innerHTML = categories[category].label
    DOMHandler.append(list, option)
  })
}

const hideModal = (e, modal) =>
  e === 'modal-background' && (modal.style.display = 'none')

export const onSubmit = () =>
  document.getElementById('modal-form').addEventListener('submit', e => submitModalForm(e))

const submitModalForm = e => {
  e.preventDefault()
  const [ author, url, category, title ] = getFormValues()
  if(!author || !url || !category || !title) return alert("You need to fill all the fields.")

  const link = {
    meta: {
      author,
      title,
      url,
    },
    category,
    comments: 0,
    created_at: Date.now(),
    upvotes: 0,
  }

  posts.setPost(link)
}

const getFormValues = () => [
  document.getElementById('modal-post-name').value,
  document.getElementById('modal-post-url').value,
  document.getElementById('list-category').value,
  document.getElementById('modal-post-textarea').value
]
