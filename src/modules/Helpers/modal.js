import DOMHandler from 'modules/DOMHandler'
import { posts } from 'modules/Posts'
import { categories } from 'modules/Helpers/categories'

export const handleModal = () => {
  let modal = document.getElementById('modal-background')
  document.addEventListener('keydown', e => hideModal(e.keyCode, modal))
  modal.addEventListener('click', e => hideModal(e.target.id, modal))
  modal.classList.remove('display-none')
  modal.classList.remove('modal-out')
  modal.classList.add('modal-in')
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

const hideModal = (e, modal) =>{
  if(e === 'modal-background' || e === 27) {
    modal.classList.remove('modal-in')
    modal.classList.add('modal-out')
    setTimeout(async () => modal.classList.add('display-none'), 250)
  }
}
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
  const modal = document.getElementById('modal-background')
  modal.classList.remove('modal-in')
  modal.classList.add('modal-out')
  setTimeout(async () => modal.classList.add('display-none'), 250)
}

// Return the value of forms in array format
const getFormValues = () => [
  document.getElementById('modal-post-name').value,
  document.getElementById('modal-post-url').value,
  document.getElementById('list-category').value,
  document.getElementById('modal-post-textarea').value
]

//Add event listener to the button
export const setAddPostAction = () => {
  const button = document.getElementById('add-post')
  button.style.cursor = "pointer"
  button.addEventListener('click', handleModal)
}
