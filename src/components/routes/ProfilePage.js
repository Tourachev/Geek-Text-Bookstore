import React from 'react';
import Navbar2 from '../NavBar2';
import Footer from '../Footer';

class ProfilePage extends React.Component {
    constructor() {
        super();
        this.state = {
            user: 'dummy',
            personalInfo: [],
            addressInfo: [],
            creditInfo: []
        };
    }

    componentDidMount() {
        const personnalPath = '/personnalInfo' + this.user;

        fetch(personnalPath)
            .then(res => res.json())
            .then(personalInfo =>
                this.setState({ personalInfo: personalInfo })
            );

        const addressPath = '/addressInfo' + this.user;

        fetch(addressPath)
            .then(res => res.json())
            .then(personalInfo => this.setState({ addressInfo: personalInfo }));

        const creditPath = '/creditInfo' + this.user;

        fetch(creditPath)
            .then(res => res.json())
            .then(personalInfo => this.setState({ creditInfo: personalInfo }));
    }

    render() {
        return (
            <div>
                <div className='body'>
                    <Navbar2 />
                    <div className='tall-body container'>
                        <h1 className='display-3 '>Profile Management</h1>
                        <hr />
                        <div className='profile-card'>
                            <div className='profile-card-header'>
                                <h1 className='display-4 '>Personnal Info</h1>
                                <button
                                    type='button'
                                    class='btn btn-link btn-lg'
                                >
                                    EDIT
                                </button>
                            </div>
                            <div className='profile-card-content'>
                                <h3>First Name:</h3>
                                <h3>Last Name:</h3>
                                <h3>Username:</h3>
                                <h3>Nickname:</h3>
                            </div>
                        </div>
                        <hr />

                        <div className='profile-card'>
                            <div className='profile-card-header'>
                                <h1 className='display-4 '>
                                    Addresses On File
                                </h1>
                                <button
                                    type='button'
                                    class='btn btn-link btn-lg'
                                >
                                    EDIT
                                </button>
                            </div>
                            <div className='profile-card-content'></div>
                        </div>
                        <hr />

                        <div className='profile-card'>
                            <div className='profile-card-header'>
                                <h1 className='display-4 '>
                                    Credit Cards On File
                                </h1>
                                <button
                                    type='button'
                                    class='btn btn-link btn-lg'
                                >
                                    EDIT
                                </button>
                            </div>
                            <div className='profile-card-content'></div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default ProfilePage;
