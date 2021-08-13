import React from 'react';

var collegeinfo={}
class CollegeList extends React.Component{
  constructor(props){
    super(props)
    this.state = { 
        name:'',
        college:{},
        students:[],
        similar_colleges:{},

    }
  }

  callApi(event){
    

    console.log("callingapi ");
  }

  componentWillMount(){
    // this.callApi();
    console.log("componentWillMount ");
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3001/getCollegeByName?name="+event.target[0].value)
    .then(res=> res.json())
    .then(res=>{
        collegeinfo = res;
    })
    // this.setState({})
  }

  render(){
    return (
      <div className="CollegeList">
        <form onSubmit={this.handleSubmit}>
            <label>
                College Name:
                <input name="name" />
            </label>
        <input type="submit" value="Submit" />
        </form>
        <p>{collegeinfo.name}</p>
      </div>
    );
  }
}

export default CollegeList;
