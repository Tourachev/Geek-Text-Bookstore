import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import DetailsSection from '../screens/BookDetailsSection';
import {withRouter} from 'react-router-dom';
import Context from '../Context';

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
								bookid={this.props.match.params.id}
								username={context.username}
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
