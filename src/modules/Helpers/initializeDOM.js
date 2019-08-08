import { onSubmit as setModalSubmitAciton, setAddPostAction } from 'modules/Helpers/modal'
import { filtersDisplay, initialize as filtersInitiliaze } from 'modules/Helpers/filters'

export const initializeModal = async () => {
  await setAddPostAction()
  setModalSubmitAciton()
}

export const initializeFilters = async () => {
  await filtersInitiliaze()
  filtersDisplay()
}
