import 'babel-polyfill'

import { posts } from 'modules/Posts'
import { links as mockedLinks } from 'modules/links'
import { handleModal, onSubmit as setModalSubmitAciton } from 'modules/Helpers/modal'
import facebook from './assets/logos/facebook.svg'
import twitter from './assets/logos/twitter.svg'

document.addEventListener('DOMContentLoaded', async () => {
  fetch('https://www.mocky.io/v2/5a6bc16631000078341b8b77')
  .then((resp) => resp.json())
  .then(({ links }) => posts.initialize({ links }))
  .catch( error => posts.initialize({ links: mockedLinks }))

  setImages()
  setAddPostAction()
  setModalSubmitAciton()
})

const setImages = () => {
  document.getElementById('facebook').src = facebook
  document.getElementById('twitter').src = twitter
}

const setAddPostAction = () => {
  const button = document.getElementById('add-post')
  button.style.cursor = "pointer"
  button.addEventListener('click', handleModal)
}
