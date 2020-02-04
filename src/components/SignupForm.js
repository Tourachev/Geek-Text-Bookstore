import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Footer from '../components/Footer';

import {Link} from 'react-router-dom';
import Header from './Header';

export class SignupForm extends Component {
	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	};

	render() {
		const {values, handleChange} = this.props;
		return (
			<MuiThemeProvider>
				<React.Fragment>
					<div className='sign-in-body'>
						<h1 className='display-4  container'>Sign Up Form</h1>
						<form onSubmit={this.continue}>
							<div className='sign-in-form container'>
								<div id='sign-up-left-col'>
									First Name:
									<input
										required
										type='text'
										className='form-control'
										placeholder='Enter your First Name'
										floatingLabelText='First Name'
										onChange={handleChange('FirstName')}
										defaultValue={values.FirstName}
									/>
									<br />
									Last Name:
									<input
										required
										type='text'
										className='form-control'
										placeholder='Enter your Last Name'
										floatingLabelText='Last Name'
										onChange={handleChange('LastName')}
										defaultValue={values.LastName}
									/>
									<br />
									Email:
									<input
										required
										type='email'
										className='form-control'
										placeholder='Enter your Email'
										floatingLabelText='Email'
										onChange={handleChange('Email')}
										defaultValue={values.Email}
									/>
									<br />
									Username:
									<input
										required
										type='text'
										className='form-control'
										placeholder='Enter your Username'
										floatingLabelText='Username'
										onChange={handleChange('UserName')}
										defaultValue={values.UserName}
									/>
									<br />
								</div>
								<div id='sign-up-right-col'>
									Nickname:
									<input
										required
										type='text'
										className='form-control'
										placeholder='Enter your Nickname'
										floatingLabelText='Nickname'
										onChange={handleChange('NickName')}
										defaultValue={values.NickName}
									/>
									<br />
									Address:
									<input
										required
										type='address'
										className='form-control'
										placeholder='Enter your Address'
										floatingLabelText='Address'
										onChange={handleChange('Address')}
										defaultValue={values.Address}
									/>
									<br />
									City:
									<input
										required
										id='standard-required'
										className='form-control'
										placeholder='Enter your City'
										floatingLabelText='City'
										onChange={handleChange('City')}
										defaultValue={values.City}
									/>
									<br />
									State:
									<input
										required
										id='standard-required'
										className='form-control'
										placeholder='Enter your State'
										floatingLabelText='State'
										onChange={handleChange('State')}
										defaultValue={values.State}
									/>
									<br />
									{/* Confirm Password:
                                    <input
                                        required
                                        type='password'
                                        className='form-control'
                                        placeholder='Confirm Entered Passoword'
                                        floatingLabelText='Password Confirmation'
                                        onChange={handleChange("Password2")}
                                        defaultValue={values.Password2}
                                    /> */}
								</div>
							</div>

							<div className='container'>
								Password:
								<input
									required
									type='password'
									id='psw'
									name='psw'
									className='form-control'
									placeholder='Enter your Password'
									floatingLabelText='Password'
									onChange={handleChange('Password')}
									defaultValue={values.Password}
									pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
									title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
								/>
								<br />
								<div className='sign-up-bottom-row'>
									<button
										type='submit'
										class='btn btn-secondary btn-block'
										label='continue'
										primary={true}
										style={styles.button}
									>
										CONTINUE
									</button>
								</div>
							</div>
						</form>
					</div>
					<Footer />
				</React.Fragment>
			</MuiThemeProvider>
		);
	}
}

const styles = {
	button: {
		margin: 20
	}
};

export default SignupForm;
