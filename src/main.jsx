import React                  from 'react'
import ReactDOM               from 'react-dom/client'
import App                    from './App.jsx'
import './styles/style.scss'
import { BrowserRouter }      from "react-router-dom";
import store                  from './app/store.js';
import { Provider }           from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
)
