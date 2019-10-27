/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="row">
                <form onSubmit={this.onSubmit} className="col s6">
                    <div className="input-field">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={e => this.setState({ email: e.target.value })}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e =>
                                this.setState({ password: e.target.value })
                            }
                        />
                    </div>
                    {this.props.errors.map(error => (
                        <div key={error} style={{ color: 'red' }}>
                            {error}
                        </div>
                    ))}
                    <button className="btn" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default AuthForm;
