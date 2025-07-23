import { PropTypes } from 'prop-types';

const Notification = ({ message, whatState, isShow }) => {

  return (
    isShow && (
      setTimeout(() => {
        <div className={ `notification ${whatState ? 'error' : ''}` }>
          { message }
        </div>
      }, 5000)
    )
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  whatState: PropTypes.bool,
  isShow: PropTypes.bool
}

export default Notification;