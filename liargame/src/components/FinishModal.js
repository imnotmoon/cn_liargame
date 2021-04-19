import React from 'react'
import PropTypes from 'prop-types'

FinishModal.propTypes = {
    liar: PropTypes.bool.isRequired
}

function FinishModal({ liar }) {
    return (
        <div className="finishModal frame modal">
            finish modal
        </div>
    )
}

export default FinishModal
