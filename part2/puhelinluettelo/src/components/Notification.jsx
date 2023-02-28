

const Notification = ({ message, error}) => {

    const errorStyle = {
        color: 'red',
    }
      
    const successStyle = {
         color: 'green',
    }

    if (message === null) {
      return null
    }
  
    return (
      <div className="error" style={error ? errorStyle : successStyle}>
        {message}
      </div>
    )
  }

  export default Notification