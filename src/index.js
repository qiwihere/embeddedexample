import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css'
import './index.css';
import {users} from './mock/users'
import {domain} from "./mock/domain"
import {App} from './App.jsx';

if(process.env.NODE_ENV === 'production'){
    window.Herold = {
        mount: (props, container) => ReactDOM.render(
            <App {...props}/>,
            container
        ),
        unmount: container => ReactDOM.unmountComponentAtNode(container)
    }
}else{
    ReactDOM.render(<App users={users} domain={domain} install={()=>{}} />,document.getElementById('root'))
}


