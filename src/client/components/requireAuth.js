import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

export default WrappedComponent => {
    class RequireAuth extends Component {
        componentWillUpdate(nextProps) {
            const {
                data: { user, loading },
                router,
            } = nextProps;
            if (!loading && !user) {
                router.push('/login');
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return graphql(query)(RequireAuth);
};
