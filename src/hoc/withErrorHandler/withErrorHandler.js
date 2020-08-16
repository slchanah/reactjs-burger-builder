import React from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../aux'
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, modalCloseHandler] = useHttpErrorHandler(axios)

        return (<Aux>
            <Modal show={error} modalClose={modalCloseHandler}>
                {error ? error.message : null}
            </Modal>
            <WrappedComponent {...props} />
        </Aux>)
    }
}

export default withErrorHandler