import React, { Component } from 'react'
import { Modal, Button,Form } from 'react-bootstrap'
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";

export class BookFormUpdate extends Component {
    constructor(props){
        super(props);
       this.state={
        bookData:this.props.bookData,
        show:this.props.show
       }
      }
    

    updateBook = async (event) => {
        event.preventDefault();
        const bodyData = {
            email: this.props.auth0.user.email,
            title: event.target.title.value,
            description: event.target.description.value,
            status: event.target.status.value

        };
        let bookUrl = `http://localhost:8000/editbook/${this.props.bookId}`
        await axios.put(bookUrl, bodyData).then((response) => {
            this.setState({
                bookData: response.data.book,
                show: false
            });
          
        });
    };


    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.props.handleCloseModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Book Form </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => { this.updateBook(e) }}>
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

                            <button type="submit" class="btn btn-primary">update</button>
                        </Form>

                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default withAuth0(BookFormUpdate)
