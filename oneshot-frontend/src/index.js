import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Course from './Course';
import CollegeList from './CollegeList';


import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    DashBoard for Information on Engineering Colleges in India
    <App />
    Percentage Divison of Courses offered by the Colleges
    <Course />
    <CollegeList />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
