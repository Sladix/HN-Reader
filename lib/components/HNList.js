'use babel';

import React from 'react';
import service from '../service'
import shell from 'shell'

class HNItem extends React.Component{
  constructor(){
    super();
    this.state = {
      title : null,
      url : null,
      score : null
    }
  }
  componentDidMount(){
    let json = service.fetchLatestHN("item/"+this.props.id).then((item)=>{
      this.setState({...this.state,...item});
    }).catch((error)=>{
      console.log(error.reason);
    });

  }

  handleClick(e){
    const url = this.state.url ? this.state.url : "https://news.ycombinator.com/item?id="+this.props.id;
    shell.openExternal(url);
  }

  render(){
    const date = new Date(this.state.time);
    return(
      <div className="news" onClick={(e) => this.handleClick(e)}>
        <h5>{this.state.title}</h5>
        <p>Score : {this.state.score}</p>
      </div>
    )
  }
}
class HNButton extends  React.Component{
  constructor(){
    super();
  }

  render(){
    const className = (this.props.active == this.props.value) ? "active" : "";
    return(
      <div className={className} onClick={(e) => this.props.handleClick(this.props.value)}>{this.props.label}</div>
    )
  }
}

class HNPagination extends React.Component{
  constructor(){
    super();
    this.maxDisplay = 10;
    // TODO: Remove the middle part and set '...' ex : 1 2 3 4 5 ... 46 48 48 49 50
  }

  getPagination(){
    const self = this;
    const pagination = [];
    let start,end;
    if(self.props.totalPages > 1){
      if(self.props.totalPages <= self.maxDisplay){
        start = 1;
        end = self.props.totalPages;
      }else{
        start = self.props.page - Math.floor(self.maxDisplay / 2);
    		end = self.props.page + Math.floor(self.maxDisplay / 2);
        if (start < 1) {
    			end += Math.abs(start) + 1;
    			start = 1;
    		}
    		if (end > self.props.totalPages) {
    			start -= (end - self.props.totalPages);
    			end = self.props.totalPages;
    		}
      }

      if(start > 1){
        pagination.push(<HNButton handleClick={self.props.changePage} active={self.props.page} value={1} label={1} />);
        pagination.push(<div>...</div>);
      }
      for (var i = start; i <= end; i++) {
        pagination.push(<HNButton handleClick={self.props.changePage} active={self.props.page} value={i} label={i} />);
      }
      if(end < self.props.totalPages){
        pagination.push(<div>...</div>);
        pagination.push(<HNButton handleClick={self.props.changePage} active={self.props.page} value={self.props.totalPages} label={self.props.totalPages} />);
      }
    }
    return pagination;
  }

  render(){
    const pagination = this.getPagination();


    return(
      <div id="pagination">
        {pagination}
      </div>
    )
  }
}

class HNList extends React.Component{
  constructor(){
    super();
    const {props} = this;
    this.postsPerPage = 10;
    this.state = {
      news : [],
      type : "topstories",
      loading: true,
      page: 1,
      totalPages: 1
    }
  }

  componentDidMount(){
    this.refreshNews();
    setInterval(this.refreshNews.bind(this),1000*atom.config.get('HNReader.refreshTime'));
  }

  changePage(page){
    const self = this;
    this.setState({
      news : self.state.allNews.slice((page-1)*self.postsPerPage,page*self.postsPerPage),
      page : page
    });
  }

  refreshNews(){
    const self = this;
    let news = service.fetchLatestHN(this.state.type).then((news)=>{
      self.setState({
        allNews: news,
        news: news.slice(0,self.postsPerPage),
        loading:false,
        totalPages: Math.floor(news.length / self.postsPerPage),
        page: 1
      })
    })
  }

  handleClick(type){
    this.setState({
      type : type,
      loading: true
    },function(){
      this.refreshNews();
    });
  }

  render(){
    const {state} = this;
    const items = state.news.map((item) => {
        return <HNItem key={item} id={item} />
      }
    );
    const className = this.state.loading ? "loading" : "";
    return(
      <div id="hnlist" className={className}>
        <div className="controls">
          <HNButton active={this.state.type} handleClick={this.handleClick.bind(this)} label="Top" value="topstories"/>
          <HNButton active={this.state.type} handleClick={this.handleClick.bind(this)} label="News" value="newstories"/>
          <HNButton active={this.state.type} handleClick={this.handleClick.bind(this)} label="Best" value="beststories"/>
          <HNButton active={this.state.type} handleClick={this.handleClick.bind(this)} label="Ask" value="askstories"/>
          <HNButton active={this.state.type} handleClick={this.handleClick.bind(this)} label="Show" value="showstories"/>
        </div>
        {items}
        <HNPagination page={this.state.page} totalPages={this.state.totalPages} changePage={this.changePage.bind(this)} />
      </div>
    )
  }
}


export default HNList;
