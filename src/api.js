document.addEventListener('DOMContentLoaded', async () => {
  fetch('https://www.mocky.io/v2/5a6bc16631000078341b8b77')
  .then((resp) => resp.json())
  .then(({ links }) => new Posts({ links }))
  .catch( error => new Posts({ links: mockedLinks }))
})
