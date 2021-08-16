import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData :[]
    };
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
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {this.state.bookData.length > 0 &&
          <>
            {
              this.state.bookData.map(ele => {
                return (
                  <div class="card">
                    <div class="card-header">
                    {ele.title}
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">{ele.descripyion}</h5>
                      <p class="card-text">{ele.status}</p>
                  
                    </div>
                  </div>
                )
              })
            }
          </>
        }

      </Jumbotron>
    )
  }
}

export default MyFavoriteBooks;
