// Reac modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

// External modules
import axios from 'axios';

// Reducers
import UserReducer from './reducers/UserReducer';

// Components
import App from './App';

// Styles
import './index.css';

// 기본 주소 경로 설정
axios.defaults.baseURL = 'http://localhost:9998'; 

// 쿠키 값을 자동으로 포함하여 전송해줌
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Store 생성 : 각각의 리듀서를 하나로 합쳐줌
const store = configureStore({
  reducer: {
    user: UserReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
  devTools: true
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
