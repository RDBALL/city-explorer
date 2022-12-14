import React from "react";

class Alert extends React.Component {
  render () {
    return (
      <>
        <div className="appAlert" role="alert">
          <p>
            {this.props.errorMessage}
          </p>
        </div>      
      </>
    )
  };
}

export default Alert;