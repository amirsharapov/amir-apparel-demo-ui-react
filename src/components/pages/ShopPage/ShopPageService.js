import constants from "../../../utils/constants"
import { sendHttpRequest } from "../../../utils/httpHelper"
import { buildSearchQuery } from "../../../utils/utils"

export const buildSetOptionsUsingDispatch = (dispatch) => {
  return (attribute) => {
    return (value) => {
      dispatch({
        attribute,
        value,
        type: 'initial_render'
      })
    }
  }
}

export const getProducts = (searchQuery, setProducts, setCurrentPage, setTotalPages, setApiError) => {
  sendHttpRequest('GET', constants.PRODUCTS_ENDPOINT + '/filter' + searchQuery)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error("Error")
    })
    .then((body) => {
      setProducts(body.content);
      setTotalPages(body.totalPages)
      setCurrentPage(body.number + 1)
      setApiError('');
      // run history.push here!
    })
    .catch(setApiError);
}

export const getFilterOptions = (attributeName, setOptions, setApiErorr) => {
  sendHttpRequest('GET', `/products/attribute/${attributeName}`)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
    })
    .then((body) => {
      if (Array.isArray(body)) {
        setOptions(Object.fromEntries(body.map((option) => [option.toLowerCase(), false])))
      }
      setApiErorr('')
    })
    .catch(setApiErorr);
}