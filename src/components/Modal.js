import React, { Component } from 'react';

class Modal extends Component {
  render() {
  return (
    <div className={this.props.show}>
      <section className="modal-main">
        <div className="modal-input-container">
          <input className="modal-input" onChange={this.props.onRoomChange} value={this.props.newRoom}>
          </input>
        </div>

        <div className="modal-button-container">
          <div className="modal-button" onClick={this.props.handleRoomAddClick}>Add</div>
        </div>
        <div className="modal-button-container">
          <div className="modal-button" onClick={this.props.handleClose}>Close</div>
        </div>

      </section>
    </div>
    );
  };
}
export default Modal;
