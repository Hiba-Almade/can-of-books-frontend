import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';
import BookFormModal from './BookFormModal';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      showModel: false
    };
  }

  handleShow = () => {
    this.setState({
      showModel: true
    })
    console.log(this.state.showModel)

  }
  handleClose = () => {
    this.setState({
      showModel: false
    })
    console.log(this.state.showModel)
  }

  deleteBook =(id)=>{
      let config={
          method: 'delete',
          baseURL: "http://localhost:8000",
          url: `/delbooks/${id}?email=${this.props.auth0.user.email}`,         
      }
      axios(config).then(result=>{
        this.setState({
          bookData:result.data.books
       
        })
        console.log(bookData)
      })
  
  }
  componentDidMount = () => {
    let url = `http://localhost:8000/books?email=hibaalmade998@gmail.com`
    axios.get(url).then(res => {
      this.setState({
        bookData: res.data
      })
    })
  }


  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          <Button onClick={this.handleShow}>Add new Book </Button>
          <>

            {this.state.bookData.length > 0 &&
              <Carousel>
                {
                  this.state.bookData.map(ele => {
                    return (
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src="https://images.pexels.com/photos/159720/justice-law-case-hearing-159720.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                          alt="Third slide"
                        />
                        <Carousel.Caption>
                          <h3>{ele.title}</h3>
                          <p>{ele.description}</p>
                          <p>{ele.status}</p>
                          <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-secondary">Edit</button>
                            <button type="button" class="btn btn-secondary" onClick={() => this.deleteBook(ele._id)}>Delete</button>
                         
                          </div>
                        </Carousel.Caption>
                      </Carousel.Item>

                      // <div class="card">
                      //   <div class="card-header">
                      //     {ele.title}
                      //   </div>
                      //   <div class="card-body">
                      //     <h5 class="card-title">{ele.descripyion}</h5>
                      //     <p class="card-text">{ele.status}</p>

                      // </div>
                      // </div>
                    )
                  })
                }

              </Carousel>
            }


          </>
        </Jumbotron>
        <BookFormModal show={this.state.showModel} handleCloseModel={this.handleClose} bookData={this.state.bookData} />
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);

