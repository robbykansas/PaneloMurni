import axios from '../config/axios'

export function fetchProduct(page) {
  return (dispatch) => {
    dispatch({
      type: 'loading/setLoading',
      loading: true
    })
    axios.get(`/products?page=${page}&limit=3`)
      .then(result => {
        dispatch({
          type: 'products/setProducts',
          products: result.data
        })
        dispatch({
          type: 'loading/setLoading',
          loading: false
        })
      })
      .catch(e => {
        dispatch({
          type: 'error/setError',
          error: e
        })
      })
  }
}

export function fetchCategories() {
  return (dispatch) => {
    dispatch({
      type: 'loading/setLoading',
      loading: true
    })
    axios.get('/categories')
    .then(result => {
      dispatch({
        type: 'categories/setCategories',
        categories: result.data
      })
      dispatch({
        type: 'loading/setLoading',
        loading: false
      })
    })
    .catch(e => {
      dispatch({
        type: 'error/setError',
        error: e
      })
    })
  }
}

export function changeFilter(data) {
  return (dispatch) => {
    dispatch({
      type: 'filter/setFilter',
      filter: data
    })
  }
}

export function update(obj, id) {
  return (dispatch) => {
    axios.put(`/edit/${id}`, obj)
      .then(result => {
        console.log(result)
      })
      .catch(e => {
        dispatch({
          type: 'error/setError',
          error: e
        })
      })
  }
}

export function deleteData(id) {
  return (dispatch) => {
    axios.delete(`/delete/${id}`)
      .then(result => {
        console.log(result)
      })
      .catch(e => {
        dispatch({
          type: 'error/setError',
          error: e
        })
      })
  }
}

export function addData(obj) {
  return (dispatch) => {
    axios.post('/add')
      .then(result => {
        console.log(result)
      })
      .catch(e => {
        dispatch({
          type: 'error/setError',
          error: e
        })
      })
  }
}