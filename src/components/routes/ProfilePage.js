import React from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";

class ProfilePage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className='body'>
                    <NavBar />
                    <p>PROFILE PAGE YOU FOOLS</p>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default ProfilePage;
