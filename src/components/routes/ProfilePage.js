import React from "react";
import Footer from "../Footer";
import Personal from "../profile/personal";
import Credit from "../profile/credit";
import Address from "../profile/address";
import AddressAddModal from "../profile/AddressAddModal";
import CreditAddModal from "../profile/CreditAddModal";
import { Link } from "react-router-dom";
import Context from "../Context";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            personalInfo: [],
            addressInfo: [],
            creditInfo: []
        };
    }

    render() {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <Context.Consumer>
                        {context => (
                            <div className='body'>
                                <div className='container' id='profile-page'>
                                    <h1 className='display-3 '>Welcome Home</h1>
                                    <hr />
                                    <div className='profile-card'>
                                        <div className='profile-card-header'>
                                            <h1 className='display-4 '>
                                                Personal Info
                                            </h1>
                                        </div>

                                        <div className='profile-card-content'>
                                            <Personal
                                                username={context.username}
                                            />
                                        </div>
                                    </div>
                                    <hr />

                                    <div className='profile-card'>
                                        <div className='profile-card-header'>
                                            <h1 className='display-4 '>
                                                Addresses On File
                                            </h1>
                                            <AddressAddModal
                                                username={context.username}
                                            />
                                        </div>
                                        <div className='profile-card-content'>
                                            <Address
                                                username={context.username}
                                            />
                                        </div>
                                    </div>
                                    <hr />

                                    <div className='profile-card'>
                                        <div className='profile-card-header'>
                                            <h1 className='display-4 '>
                                                Credit Cards On File
                                            </h1>
                                            <CreditAddModal
                                                username={context.username}
                                            />
                                        </div>
                                        <div className='profile-card-content'>
                                            <Credit
                                                username={context.username}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        )}
                    </Context.Consumer>
                </div>
            );
        } else {
            return (
                <div class='ohoh'>
                    <h1 class='display-4'>Oh, Oh!</h1>
                    <p class='lead'>Looks like you're not logged in!</p>
                    <p class='lead'>Click below to get to the login page.</p>
                    <hr class='my-4' />
                    <p class='lead'>
                        <Link to='/login'>
                            <button
                                type='button'
                                class='btn btn-outline-primary btn-block'
                            >
                                Take Me There!
                            </button>
                        </Link>
                    </p>
                </div>
            );
        }
    }
}

export { ProfilePage };
