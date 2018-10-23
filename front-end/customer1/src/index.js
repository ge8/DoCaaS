import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';


//Delete <h6> for multi-tenant!
ReactDOM.render(
    <div className="App">
        <h6>Customer1</h6> 
        <App />
    </div>, 
    document.getElementById('root')
);
registerServiceWorker();
