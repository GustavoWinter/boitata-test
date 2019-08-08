import 'babel-polyfill'

import { get as getPosts }  from 'api/posts'
import callApi from 'api/request'
import { posts } from 'modules/Posts'
import { links as mockedLinks } from 'app/mocks/links'
import { initializeModal, initializeFilters } from 'modules/Helpers/initializeDOM'

import facebook from './assets/logos/facebook.svg'
import twitter from './assets/logos/twitter.svg'

document.addEventListener('DOMContentLoaded', async () => {
  setImages()
  callApi({ ...getPosts })
  initializeModal()
  initializeFilters()
})

const setImages = () => {
  document.getElementById('facebook').src = facebook
  document.getElementById('twitter').src = twitter
}
