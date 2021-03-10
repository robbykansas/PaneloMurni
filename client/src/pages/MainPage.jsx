import React, {useEffect, useState} from 'react'
import Cardlist from '../components/Cardlist'
import Navbar from '../components/Navbar'
import { fetchCategories, fetchProduct} from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

export default function MainPage() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const error = useSelector(state => state.error)
  const loading = useSelector(state => state.loading)
  const [page, setPage] = useState(1)
  // const page = 1
  useEffect(_ => {
    dispatch(fetchProduct(page))
    dispatch(fetchCategories())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]) 
  if(error) return <h2>{error}</h2>
  if(loading) return <h2>Loading ...</h2>
  function changePage(page) {
    setPage(page)
  }
  return(
    <div className="container">
      <Navbar />
      <div className="row flex-row">
      { products.map(product => {
        return (
          <Cardlist key={product.id} product={product} />
        )
      })}
      <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#/page1" onClick={() => changePage(1)}>1</a></li>
    <li className="page-item"><a className="page-link" href="#/page2" onClick={() => changePage(2)}>2</a></li>
  </ul>
</nav>
      </div>
    </div>
  )
}