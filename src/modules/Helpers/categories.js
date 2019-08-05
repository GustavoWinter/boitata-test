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
  !!categories[category]
    ? categories[category]
    : setNewCategory(category)

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

const normalizeCategory = category =>
  category.split("_").map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ")

const handleColor = (color = generateHexColors()) =>
  hasColor(color)
    ? handleColor()
    : color

const generateHexColors = () =>
  '#'+Math.floor(Math.random()*16777215).toString(16);

const hasColor = color =>
  !!Object.keys(categories).filter( key => categories[key].color === color).length

const hasCategory = category => !!categories[category]
