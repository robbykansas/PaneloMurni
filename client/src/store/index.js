import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
const initialState = {
  products: [],
  categories: [],
  filter: '',
  error: null,
  loading: true
}

function reducer(state = initialState, action){
  switch(action.type) {
    case "loading/setLoading":
      return { ...state, loading: action.loading }
    case "error/setError":
      return { ...state, error: action.error }
    case "products/setProducts":
      return { ...state, products: action.products }
    case "categories/setCategories":
      return { ...state, categories: action.categories }
    case "filter/setFilter":
      return { ...state, filter: action.filter}
    case "addProduct/setAddProduct":
      return { ...state, products: [...state.products, action.addProducts]}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store