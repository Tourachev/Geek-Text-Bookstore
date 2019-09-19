import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';

import NavBar from './components/NavBar';
import Body from './components/Body';

import './css/index.css';

class App extends Component {
    render() {
        return (
            <div>
                <div className='body'>
                    <NavBar />
                    <Body />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
