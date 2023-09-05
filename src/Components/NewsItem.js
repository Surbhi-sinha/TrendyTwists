import React, { Component } from 'react'

// api key :-  1c4ae663ac074a889e7bcf5a6dd3324e
export default class NewsItem extends Component {
      //constructor should be used with super class's constuctor, constructor is called always when an instance of this class is called
      // constructor(){
      //       super();
      // }

      

      render() {
            let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
            return (
                  <div className="card my-3">
                        <div  style={{width: "18rem"}}>
                              
                              <img src={imageUrl?imageUrl:"https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/11cf0e30bb3cfd27a7b0f55aa6eddfd3.jpg"} className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                          
                                          <h5 className="card-title">{title} <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: '90%' , zIndex : '1'}}>
                                                {source}
                                          <span className="visually-hidden">unread messages</span>
                                          </span></h5>
                                          <p className="card-text">{description}...</p>
                                          <p className="card-text"><small className="text-body-secondary">Last updated by {author} at {new Date(date).toLocaleTimeString()}</small></p>
                                          <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">Read more..</a>
                                    </div>
                        </div>
                  </div>
            )
      } 
}
