/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            errors: [],
        };
    }

    componentWillUpdate(nextProps) {
        if (!this.props.data.user && nextProps.data.user) {
            this.props.router.push('/dashboard');
        }
    }

    onSubmit({ email, password }) {
        this.props
            .mutate({
                variables: { email, password },
                refetchQueries: [{ query }],
            })
            .catch(res => {
                this.setState({
                    errors: res.graphQLErrors.map(error => error.message),
                });
            });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm onSubmit={this.onSubmit} errors={this.state.errors} />
            </div>
        );
    }
}

export default graphql(query)(graphql(mutation)(LoginForm));
