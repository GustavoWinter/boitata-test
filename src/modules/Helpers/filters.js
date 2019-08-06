import { posts } from 'modules/Posts'

export const initialize = () =>
  document.querySelectorAll("[data-filter]").forEach(
    filter => setButtonAction(filter, filter.dataset.filter)
  )

const setButtonAction = (button, filter) =>
  button.addEventListener('click', () => posts.filterBy(filter))

export const filtersDisplay = () =>
  document.getElementById('filter-trigger').addEventListener('click', () => showElement())

const showElement = () => {
  let filter = document.getElementById('filters')
  filter.classList.contains('display-none')
    ? filter.classList.remove('display-none')
    : filter.classList.add('display-none')
}
