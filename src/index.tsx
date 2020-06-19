import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
//import './index.css';
import App from './App'
import {SessionDataProvider, useSessionDataState, useSessionDataDispatch} from './AuthContext'

import './i18n'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
      <SessionDataProvider>
    <Suspense fallback={null}>
      <App />
    </Suspense>
    </SessionDataProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
