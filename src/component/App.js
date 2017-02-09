import React, { Component, PropTypes } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { itemsFetchData, itemsSingleFetchData } from '../actions/items';

class App extends Component {
  componentDidMount() {
    this.props.fetchData('http://eaglecom.diametrix.com.au/wp-json/wp/v2/floor-api');
    this.dataselect = this.dataselect.bind(this);
  }

  dataselect(data) {
    this.props.fetchSingleData(data)
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <div>
      <ul>
        {this.props.posts.map((post) => (
          <li key={post.id} onClick={this.dataselect.bind(this.state, post)}>{post.title.rendered}</li>
        ))}
      </ul>
      <h2>{!this.props.singlepost.id ? 'not selected' : this.props.singlepost.title.rendered}</h2>
      </div>
    );
  }
}

App.propTypes = {
  fetchData: PropTypes.func.isRequired,
  fetchSingleData: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSingleLoading: PropTypes.bool,
  singlepost: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    isSingleLoading: state.itemsSingleIsLoading,
    singlepost: state.singlepost 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
    fetchSingleData: (data) => dispatch(itemsSingleFetchData(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);