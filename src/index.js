import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

const App = () => {
    return (
        <div className='body'>
            <div className='jumbotron header'>
                <div className='container'>
                    <h1 className='display-1'>Howdy Partners</h1>
                    <h1 className='display-4'>
                        This is the landing for CEN4010 Team 8
                    </h1>
                    <hr className='my-4' />
                    <p>Learn more about all software engineering everything</p>
                    <a
                        className='btn btn-primary btn-lg'
                        href='https://stackoverflow.com/questions/434414/what-is-the-most-evil-code-you-have-ever-seen-in-a-production-enterprise-environ'
                        role='button'
                    >
                        TAKE ME THERE
                    </a>
                </div>
            </div>

            <div className='container'>
                <ul>
                    <h2>Currently included:</h2>
                    <li>Bootstrap</li>
                    <li>FontAwesome</li>
                    <li>jQuery</li>
                </ul>
            </div>
        </div>
    );
};

const Body = () => {
    return {};
};

ReactDOM.render(<App />, document.getElementById("root"));
