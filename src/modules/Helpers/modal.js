import DOMHandler from 'modules/DOMHandler'
import { posts } from 'modules/Posts'
import { categories } from 'modules/Helpers/categories'

export const handleModal = () => {
  let modal = document.getElementById('modal-background')
  modal.addEventListener('click', (e) => hideModal(e.target.id, modal))
  modal.classList.remove('display-none')
  appendCategories()
}

// Append the categories to the DOM in #list-category
const appendCategories = () => {
  const list = document.getElementById('list-category')
  Object.keys(categories).forEach(category => {
    const option = DOMHandler.createNode('option')
    option.innerHTML = categories[category].label
    DOMHandler.append(list, option)
  })
}

const hideModal = (e, modal) =>
  e === 'modal-background' && modal.classList.add('display-none')

export const onSubmit = () =>
  document.getElementById('modal-form').addEventListener('submit', e => submitModalForm(e))

// It'll create the json of the new post and add it to the existing list
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
  document.getElementById('modal-background').classList.add('display-none')
  posts.filterBy()

}

// Return the value of forms in array format
const getFormValues = () => [
  document.getElementById('modal-post-name').value,
  document.getElementById('modal-post-url').value,
  document.getElementById('list-category').value,
  document.getElementById('modal-post-textarea').value
]
