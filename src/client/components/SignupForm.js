import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
import AuthForm from './AuthForm';
import query from '../queries/CurrentUser';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { errors: [] };
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
        const { errors } = this.state;
        return (
            <div>
                <h3>Sign up</h3>
                <AuthForm onSubmit={this.onSubmit} errors={errors} />
            </div>
        );
    }
}

export default graphql(query)(graphql(mutation)(SignupForm));
