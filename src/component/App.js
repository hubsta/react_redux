import React, { Component, PropTypes } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { itemsFetchData, itemsSingleFetchData } from '../actions/items';
import SkyLight from 'react-skylight';
 
class App extends Component {
  componentDidMount() {
    this.props.fetchData('http://175eagle.local/wp-json/wp/v2/floor-api?per_page=100');
    this.dataselect = this.dataselect.bind(this);
  }

  dataselect(data) { 
    this.props.fetchSingleData(data)
    this.refs.simpleDialog.show()
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    var myBigGreenDialog = {
      backgroundColor: '#e8e8e8',
      width: '100%',
      height: '100%',
      marginTop: '0',
      marginLeft: '0',
      left: '0',
      top: '0',
      bottom: 'auto',
      padding: '0'
    };

    return ( 
      <div>
        {this.props.posts.map((post) => (
          <div key={post.id} onClick={post.acf.floor_is_available === true ? this.dataselect.bind(this.state, post) : null} className={post.acf.floor_is_available === true ? 'is__link floor__detail floor__detail--' + post.id : 'floor__detail floor__detail--'+ post.id}>
            <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4">{post.title.rendered}</div>
                <div className="col-md-4">{post.acf.fps_floor_sqm}</div>
                <div className="col-md-4"></div>
              </div>
            </div>
            </div>
          </div>
        ))}
        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref="simpleDialog">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>{!this.props.singlepost.id ? 'not selected' : this.props.singlepost.title.rendered}</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6"></div>
              <div className="col-md-6">
                {!this.props.singlepost.id ? 'not selected' : this.props.singlepost.acf.fps_main_title}
              </div>
            </div>
          </div>
        </SkyLight>
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