import React from 'react';
import Navbar2 from '../NavBar2';
import Footer from '../Footer';
import Personal from '../profile/personal';
import Credit from '../profile/credit';
import Address from '../profile/address';
import PersonalEditModal from '../profile/PersonalEditModal';
import AddressAddModal from '../profile/AddressAddModal';
import CreditEditModal from '../profile/CreditEditModal';
import CreditAddModal from '../profile/CreditAddModal';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.location.state.username,
            personalInfo: [],
            addressInfo: [],
            creditInfo: []
        };
    }

    componentDidMount() {
        // console.log(this.state.username);
        // const addressPath = '/addressInfo' + this.user;
        // fetch(addressPath)
        //     .then(res => res.json())
        //     .then(personalInfo => this.setState({ addressInfo: personalInfo }));
        // const creditPath = '/creditInfo' + this.user;
        // fetch(creditPath)
        //     .then(res => res.json())
        //     .then(personalInfo => this.setState({ creditInfo: personalInfo }));
    }

    handleAddAddress() {
        console.log('clicked personal info edit');
    }

    render() {
        return (
            <div>
                <div className='body'>
                    <Navbar2 />
                    <div className='container' id='profile-page'>
                        <h1 className='display-3 '>Welcome Home </h1>
                        <hr />
                        <div className='profile-card'>
                            <div className='profile-card-header'>
                                <h1 className='display-4 '>Personal Info</h1>
                            </div>

                            <div className='profile-card-content'>
                                <Personal username={this.state.username} />
                            </div>
                        </div>
                        <hr />

                        <div className='profile-card'>
                            <div className='profile-card-header'>
                                <h1 className='display-4 '>
                                    Addresses On File
                                </h1>
                                <AddressAddModal
                                    username={this.state.username}
                                />
                            </div>
                            <div className='profile-card-content'>
                                <Address username={this.state.username} />
                            </div>
                        </div>
                        <hr />

                        <div className='profile-card'>
                            <div className='profile-card-header'>
                                <h1 className='display-4 '>
                                    Credit Cards On File
                                </h1>
                                <CreditAddModal
                                    username={this.state.username}
                                />
                            </div>
                            <div className='profile-card-content'>
                                <Credit username={this.state.username} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default ProfilePage;
