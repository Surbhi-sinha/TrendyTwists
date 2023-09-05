import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
      static defaultProps = {
            country: 'in',
            pageSize: 6,
            category: 'general',
      }
      static propTypes = {
            name: PropTypes.string,
            pageSize: PropTypes.number,
            category: PropTypes.string
      }
      constructor(props) {
            super(props);
            this.state = {
                  articles: [],
                  loading: false,
                  page: 1
            }
            document.title = `${this.capitalizeFirstChar(this.props.category)}`;
      }

      //componentDidMount method will run after the render method is completed
      async componentDidMount() {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=36a508438bb445188d56b3fa994d9173&pagesize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                  articles: parsedData.articles,
                  totalResults: parsedData.totalResults,
                  loading: false
            });
            // this.updateNews();
      }
      //=====handle next click ad prev click is not used now because of the infinte loader component
      handleNextClick = async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=36a508438bb445188d56b3fa994d9173&pagesize=${this.props.pageSize}&page=${this.state.page + 1}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({ loading: true });
            this.setState({
                  page: this.state.page + 1,
                  articles: parsedData.articles,
                  loading: false,
                  totalPages: parsedData.totalResults
            })
      //    this.setState({page : this.state.page+1});   => after creating the updatenews()
      // this.updateNews();
      }
      //async function as it need to resolve the promise from the API response

      handlePrevClick = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&&category=${this.props.category}&apiKey=36a508438bb445188d56b3fa994d9173&pagesize=${this.props.pageSize}&page=${this.state.page - 1}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ loading: true })
      this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false,
            totalPages: parsedData.totalResults
      })
      //    this.setState({page : this.state.page-1});   => after creating the updatenews()
      // this.updateNews();
      }
      capitalizeFirstChar = (inputString) => {
            // Check if the input string is empty or null
            if (!inputString) return inputString;

            // Capitalize the first character and concatenate the rest of the string
            return inputString.charAt(0).toUpperCase() + inputString.slice(1);
      }
      // fetchMoreData = async () => {
      //       this.setState({ page: this.state.page + 1 });
      //       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&&category=${this.props.category}&apiKey=1c4ae663ac074a889e7bcf5a6dd3324e&pagesize=${this.props.pageSize}&page=${this.state.page}`;
      //       this.setState({ loading: true })
      //       let data = await fetch(url);
      //       let parsedData = await data.json();
      //       this.setState({
      //             articles: this.state.articles.concat(parsedData.articles),
      //             totalResults: parsedData.totalResults,
      //             loading: false,
      //       })
      // };

      updateNews = async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&&category=${this.props.category}&apiKey=36a508438bb445188d56b3fa994d9173&pagesize=${this.props.pageSize}&page=${this.state.page}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({ loading: true })
            this.setState({
                  articles: parsedData.articles,
                  loading: false,
                  totalPages: parsedData.totalResults
            })
      }
      render() {
            return (
                  <div className="container my-3">
                        <h2 className="d-flex justify-content-center my-3">TrendyTwist - {this.capitalizeFirstChar(this.props.category)} News headlines</h2>
                        {this.state.loading && < Spinner/>} 
                        {/* <InfiniteScroll
                              dataLength={this.state.articles.length}
                              next={this.fetchMoreData()}
                              hasMore={this.state.articles.length !== this.state.totalResults}
                              loader={<Spinner/>}
                        > */}
                              <div className="container">
                                    <div className='row'>
                                          {this.state.articles.map((element) => {
                                                // here we are going to concat the incremental data 
                                                if (element.url !== null) {
                                                      return <div className="col-md-4 d-flex justify-content-center" key={element.url ? element.url : this.generateUniqueString}>
                                                            <NewsItem title={element.title ? element.title : "India to moon!"} description={element.description ? element.description : "India to moon!!"} imageUrl={element.urlToImage} newsUrl={element.url ? element.url : ""} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                                                      </div>
                                                } else {
                                                      return null;
                                                }
                                          })}
                                    </div>
                              </div>
                        {/* </InfiniteScroll> */}
                        <div className="container d-flex justify-content-between">
                              <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}  > &larr; Previous</button>
                              <button disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
                        </div>
                  </div>

            )

      }
}
