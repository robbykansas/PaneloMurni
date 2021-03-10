import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import MainPage from './pages/MainPage'
import FilterPage from './pages/FilterPage'
import store from './store'

function App() {
  return (
    <Provider store = {store}>
      <Router>
        <Switch>
          <Route path='/filter'>
            <FilterPage />
          </Route>
          <Route path='/'>
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
