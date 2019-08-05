import 'babel-polyfill'

import Posts from 'modules/Posts'
import { links as mockedLinks } from 'modules/links'
import facebook from './assets/logos/facebook.svg'
import twitter from './assets/logos/twitter.svg'

document.addEventListener('DOMContentLoaded', async () => {
  fetch('https://www.mocky.io/v2/5a6bc16631000078341b8b77')
  .then((resp) => resp.json())
  .then(({ links }) => new Posts({ links }))
  .catch( error => new Posts({ links: mockedLinks }))

  setImages()
})

const setImages = () => {
  document.getElementById('facebook').src = facebook
  document.getElementById('twitter').src = twitter
}
