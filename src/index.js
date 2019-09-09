import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const App = () => {
    return (
        <div className='body'>
            <div className='jumbotron'>
                <h1>Howdy Partners</h1>
                <p>This is the landing for CEN4010 Team 8</p>
            </div>

            <div>
                <p></p>
            </div>
        </div>
    );
};

const Body = () => {
    return {};
};

ReactDOM.render(<App />, document.getElementById('root'));
