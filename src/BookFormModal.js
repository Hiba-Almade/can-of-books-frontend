import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

export class BookFormModal extends Component {

  handleClose = () => {
    this.setState({
      showModel: false
    })
    console.log(this.state.showModel)
  }


  render() {
    return (
      <>

        <Modal show={this.props.showModel} onHide={this.props.handleCloses}>
          <Modal.Header closeButton>
            <Modal.Title>Add new book</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div>
              <form>
                <div class="form-group">
                  <label for="title">title</label>
                  <input type="text" class="form-control" id="title" name="title" />
                </div>
                <div class="form-group">
                  <label for="description">description</label>
                  <input type="text" class="form-control" id="description" name="description" />
                </div>
                <div class="form-group">
                  <label for="status">status</label>
                  <input type="text" class="form-control" id="status" name="status" />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>

          </Modal.Body>
          <Modal.Footer>


          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default BookFormModal
