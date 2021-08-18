import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";



export class BookFormModal extends Component {
  constructor(props){
    super(props);
   
  }

 
  addBook =(event) =>{
    event.preventDefault()
    let data={
        email:this.props.auth0.user.email,
        title:event.target.title.value,
        description:event.target.description.value,
        status:event.target.status.value
       
    }
    let config={
        method: 'post',
        baseURL: "http://localhost:8000",
        url: '/addbooks',
        data:data                    
    }
    axios(config).then(result=>{
        console.log(result.data)
      
        this.setState({
          bookData:result.data.books
        })
    });
  }


  render() {
    return (
      <>

        <Modal show={this.props.show} onHide={this.props.handleCloseModel}>
          <Modal.Header closeButton>
            <Modal.Title>Add new book</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div>
              <form onSubmit ={e => this.addBook(e)}>
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

export default withAuth0(BookFormModal);
