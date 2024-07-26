import React, { useEffect, useState } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News=(props)=> {

  const [articles, setArticles]=useState([])
  const [loading, setLoading]=useState(true)
  const [page, setPage]=useState(1)
  const [TotalResults, setTotalResults]=useState(0)
  // document.title = `${props.category}- News Monkey`

 
  // constructor(props) {
  //   super(props);

  // }

useEffect(()=>{
  const updateNews=async() =>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e60d2c8c0afb42f98ce2ac36174dffea&page=${page}&pageSize=${props.pageSize}`;
    
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }
  updateNews();
},[articles, page, props.category, props.country, props.pageSize]);
 

 const capitalizeFirstLetter=(string) =>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews();
  // }
  const fetchMoreData = async () => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e60d2c8c0afb42f98ce2ac36174dffea&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    
    
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
  };

 
    return (
      <>

        <h1 className='text-center' style={{fontFamily:'poppins'}}>NEWS BOT :Get Your Daily News Headlines On {capitalizeFirstLetter(props.category)}</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== TotalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ''} description={element.description ? element.description : ''} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-around my-4">

          <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-primary">&larr; Previous</button>
          
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-primary">Next &rarr;</button>
        </div> */}
      </>

    )
  
}

News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
