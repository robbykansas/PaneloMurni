import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeFilter } from '../store/action'
import { useHistory } from 'react-router-dom'
import exportFromJSON from 'export-from-json'

export default function Navbar() {
  const dispatch = useDispatch()
  const error = useSelector(state => state.error)
  const loading = useSelector(state => state.loading)
  const filterData = useSelector(state => state.filter)
  const categories = useSelector(state => state.categories)
  const products = useSelector(state => state.products)
  const history = useHistory()

  if(error) return <h2>{error}</h2>
  if(loading) return <h2>Loading ...</h2>
  
  function filterChange(e) {
    if (e.target.value === '') {
      dispatch(changeFilter(e.target.value))
      history.push('/')
    } else {
      dispatch(changeFilter(e.target.value))
      history.push('/filter')
    }
    
  }
  function goAdd() {
    console.log('add')
  }
  function goXml() {
    const data = products
    const fileName = 'download'
    const exportType = 'xml'
    exportFromJSON({data, fileName, exportType})
  }
  function goExcel() {
    const data = products
    const fileName = 'download'
    const exportType = 'xls'
    exportFromJSON({data, fileName, exportType})
  }
  return (
    <div>
      <select className="form-select" style={{marginTop: 20}} value={filterData} onChange={(e) => filterChange(e)}>
        <option key={filterData} value=''> ------ </option>
        {categories.map(category => {return <option key={category.id} value={category.name}>{category.name}</option>})}
      </select>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href='#/goUpload' onClick={goAdd}>Tambahkan</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href='#/goBank' onClick={goXml}>Export to XML</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href='#/goLog' onClick={goExcel}>Export to Excel</a>
          </li>
        </ul>
      </div>
      </nav>
    </div>
  )
}