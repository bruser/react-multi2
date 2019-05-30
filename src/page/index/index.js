// import ReactDom from 'react-dom';
// import Main from './Main/Main.jsx';

// ReactDom.render(<Main />, document.getElementById('root'));

import ReactDom from 'react-dom';
import React from 'react';
import store from './store';

import { Provider } from 'react-redux';
import Component1 from './test/index.jsx'
import '../../assets/global.scss'
// ReactDom.render(
//     <Provider store={store}>
//         <Component1/>
//     </Provider>
// , document.getElementById('root'));  
ReactDom.render(
    <Component1/>,
    document.getElementById('root')
);