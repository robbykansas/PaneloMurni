import React, {useEffect} from 'react'
import Cardlist from '../components/Cardlist'
import Navbar from '../components/Navbar'
import { fetchCategories, fetchProduct} from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

export default function FilterPage() {
  const dispatch = useDispatch()
  const error = useSelector(state => state.error)
  const loading = useSelector(state => state.loading)
  const filterData = useSelector(state => state.filter)
  const categories = useSelector(state => state.categories)
  const page = 1
  useEffect(_ => {
    dispatch(fetchProduct(page))
    dispatch(fetchCategories())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 
  if(error) return <h2>{error}</h2>
  if(loading) return <h2>Loading ...</h2>
  const filteredData = categories.filter(category => {
    return category.name === filterData
  })
  if (filteredData) {
    return(
      <div className="container">
        <Navbar />
        <div className="row flex-row">
        { filteredData[0].Products.map(product => {
          return (
            <Cardlist key={product.id} product={product} />
          )
        })}
        </div>
      </div>
    )
  }

  
}