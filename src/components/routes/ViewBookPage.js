import React from 'react';
import Footer from '../Footer';
import DetailsSection from '../screens/BookDetailsSection';
import {withRouter} from 'react-router-dom';
<<<<<<< HEAD
import Context from '../Context';
=======
import Context from './components/Context';
>>>>>>> a206b2c3d325ea172a0cb2ddcdb628684b334759

class ViewBookPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Context.Consumer>
					{context => (
						<div className='body'>
							<DetailsSection
<<<<<<< HEAD
                                bookid={this.props.match.params.id}
                                username={context.username}
                                isLoggedIn={context.isLoggedIn}
=======
								bookid={this.props.match.params.id}
>>>>>>> a206b2c3d325ea172a0cb2ddcdb628684b334759
							/>
							<Footer />
						</div>
					)}
				</Context.Consumer>
			</div>
		);
	}
}

export default ViewBookPage;