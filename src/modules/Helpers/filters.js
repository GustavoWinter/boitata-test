import { posts } from 'modules/Posts'

// Find all data-filter and add the event listener
// Data-filters are data-attribute
export const initialize = () =>
  document.querySelectorAll("[data-filter]").forEach(
    filter => setButtonAction(filter, filter.dataset.filter)
  )

// Add the event listener and the filter type
const setButtonAction = (button, filter) =>
  button.addEventListener('click', () => {
    applySelectedClass(button)
    posts.filterBy(filter)
  })

// Add the event listerner to show the elements that will be used to select the filter
export const filtersDisplay = () =>
  document.getElementById('filter-trigger').addEventListener('click', () => showElement())

export const showElement = () => {
  let filter = document.getElementById('filters')
  filter.classList.contains('display-none')
    ? filter.classList.remove('display-none')
    : filter.classList.add('display-none')
}

const applySelectedClass = button => {
  document.querySelectorAll('.selected').forEach(klass => klass.classList.remove('selected'))
  button.classList.add('selected')
}
