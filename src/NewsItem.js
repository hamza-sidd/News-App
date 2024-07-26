import React from 'react'

const NewsItem=(props)=> {

    let { title, description, imgUrl, newsUrl, author, date } = props;
    return (
      <div className='my-3'>
        <div className="card" >
          <img src={!imgUrl ? 'https://img.freepik.com/premium-photo/news-3d-text_2227-174.jpg' : imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}....</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? 'NewsMonkey' : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_/blank' className="btn btn-sm btn-primary"> Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem
