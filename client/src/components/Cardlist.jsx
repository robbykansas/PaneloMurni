import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteData} from '../store/action'

export default function Cardlist({product}) {
  const dispatch = useDispatch()
  function goUpdate() {
    console.log('update')
  }
  function deletedData() {
    dispatch(deleteData(product.id))
  }
  return (
    <div className="col-4 hover-shadow d-flex align-items-stretch">
      <div className="card shadow rounded p-3">
        <img src={product.poster} className="card-img-top" alt="poster" />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">Price: {product.price}</p>
          <p className="card-text">Stock: {product.stock}</p>
          <div className="mt-2 flex">
            <button className="btn btn-outline-primary" onClick={goUpdate}><i className="fas fa-info-circle"></i></button>
            <button className="btn btn-outline-danger ml-1" onClick={deletedData}><i className="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}