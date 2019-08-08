import 'babel-polyfill'

import { get as getPosts }  from 'api/posts'
import callApi from 'api/request'
import { posts } from 'modules/Posts'
import { links as mockedLinks } from 'app/mocks/links'
import { handleModal, onSubmit as setModalSubmitAciton } from 'modules/Helpers/modal'
import { filtersDisplay, initialize as filtersInitiliaze } from 'modules/Helpers/filters'

import facebook from './assets/logos/facebook.svg'
import twitter from './assets/logos/twitter.svg'

document.addEventListener('DOMContentLoaded', async () => {
  setImages()

  callApi({ ...getPosts })

  setAddPostAction()
  setModalSubmitAciton()
  filtersInitiliaze()
  filtersDisplay()
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
