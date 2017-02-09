import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      clickedposts: [],
      hasErrored: false,
      isLoading: false
    };
    this.clickSection = this.clickSection.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios.get(`http://eaglecom.diametrix.com.au/wp-json/wp/v2/floor-api`)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
        this.setState({ isLoading: false });
      })
      .catch(err => {
        this.setState({hasErrored: true});
      });
  }

  clickSection(value, clickvalue) {
    this.setState({ clickedposts: value }, this.valueClick);
  }

  valueClick() {
    const valuecli = this.state.clickedposts.length <= 0 ? 'None' : this.state.clickedposts;
    return valuecli;
  }
  render() {
    if (this.state.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.state.isLoading) {
      return <p>Loading…</p>;
    }
    return (
      <div>
        <div className="container">
          {this.state.posts.map(function (post, i) {
            return <div key={i} onClick={this.clickSection.bind(this.state, post)}>{post.title.rendered}</div>
          }, this)
          }
        </div>
        <h2>{typeof this.valueClick() === 'object' ? this.valueClick().title.rendered : this.valueClick()}</h2>
        <p>{typeof this.valueClick() === 'object' ? this.valueClick().acf.fps_available_date : this.valueClick()}</p>
      </div>
    );
  }
}

export default App;
