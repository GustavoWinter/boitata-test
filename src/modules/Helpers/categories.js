export let categories = {
  'ux_ui': {
    color: '#00b2c1',
    label: 'UX Theory',
  },
  'case_study': {
    color: '#f2a30d',
    label: 'Case Study',
  },
  'discussion': {
    color: '#4568c7',
    label: 'Opinion',
  },
  'product_design': {
    color: '#15df6a',
    label: 'Product Design',
  },
}

export const getCategory = category =>
  !!categories[category] || hasLabel(category)
    ? findLabel(category)
    : setNewCategory(category)

// It'll prevent that the list has two categories with differentes colors
const findLabel = category =>{
  const existLabel = Object.keys(categories).find(key => categories[key].label === category)

  if(!!existLabel) return categories[existLabel]
  return categories[category]
}

// If in some point the API response have any new categories, it'll be dynamically created
const setNewCategory = category => {
  if(hasCategory(category)) return false
  const color = handleColor()
  const label = normalizeCategory(category)
  categories[category] = {
    color,
    label,
  }

  return categories[category]
}

// Remove the underscore and set the first words letters to upper case
const normalizeCategory = category =>
  category.split("_").map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ")

// Check if category already have a color
const handleColor = (color = generateHexColors()) =>
  hasColor(color)
    ? handleColor()
    : color

// Generate a hexColor for the category
const generateHexColors = () =>
  '#'+Math.floor(Math.random()*16777215).toString(16);

// This methods will check if the category, color or label already exists
const hasCategory = category => !!categories[category]
const hasColor = color =>
  !!Object.keys(categories).filter( key => categories[key].color === color).length
const hasLabel = category =>
  !!Object.keys(categories).filter(key => categories[key].label === category).length
