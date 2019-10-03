import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Header from './Header';

export class SuccessForm extends Component {
    //GO to the next Page
    continue = e => {
        e.preventDefault();
        //the backend goes here
        this.props.nextStep();
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    render() {
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <nav
                        className='navbar navbar-expand-lg navbar-light bg-light'
                        id='sign-up-nav'
                    >
                        <div
                            className='collapse navbar-collapse'
                            id='navbarSupportedContent'
                        >
                            <div id='navbar-left'>
                                <ul className='navbar-nav navbar-items'>
                                    <li
                                        className='nav-item active'
                                        id='home-logo'
                                        onClick={Header.handleCLick}
                                    >
                                        <Link to='/'>
                                            <i className='fas fa-home fa-lg'></i>
                                        </Link>
                                    </li>

                                    <li></li>
                                </ul>
                            </div>
                            <div id='navbar-right'>
                                <ul className='navbar-nav navbar-items'>
                                    <li>
                                        <div
                                            className='ui vertical large button'
                                            tabIndex='0'
                                        >
                                            <Link to='/'>
                                                <div className='visible content'>
                                                    Exit
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className='sign-in-body container'>
                        <h1 className='display-4'>
                            Thank you for your Submission
                        </h1>
                        <p>You will get an email!</p>
                    </div>

                    <Footer />
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

export default SuccessForm;
