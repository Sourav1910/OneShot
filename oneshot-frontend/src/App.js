import React,{Component} from 'react';
import './App.css';
import {Bar} from 'react-chartjs-2';
import { render } from 'react-dom';



var cl="";
class App extends React.Component{
  
  constructor(props){
    super(props)
    
    this.state = {
      labels: [],
      datasets: [
        {
          label: 'Engineering Colleges in India',
          backgroundColor: 'rgba(149,76,202,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: []
        }
      ],
      listitems:[]
    }
  }

  callApi(){
    fetch("http://localhost:3001/getCollegePercentageByState")
    .then(res=> res.json())
    .then(res=>{
      // console.log("This is our current state" )
      // console.log(this.state)
      // console.log("This is our Response" )
      // console.log(res)
      // console.log("This is my State" )
      // console.log(this.state)
      for(var e in res){
        this.state.labels.push(e)
        this.state.datasets[0].data.push(res[e])
      }
      this.setState(this.state)})

    console.log("callingapi ");
  }

  componentWillMount(){
    this.callApi();
    console.log("componentWillMount ");
  }

  // callback(){
  //   this.forceUpdate()
  // }
  callback= (evt, element)=> {
    if(element.length !== 0){
      console.log("element")
      console.log(element)
      console.log(element[0].index)
      console.log(this)
      cl=this.state.labels[element[0].index]
      var tis=this
      fetch("http://localhost:3001/getCollegeList?state="+cl)
      .then(res=> res.json())
      .then(res =>{
        console.log(res)
        console.log(this)
        this.state.listitems = []
        for(var i=0;i<res.length;i++){
          this.state.listitems.push(res[i].name)
        }
        this.setState({})
      })
      
      console.log(this.state)
    }
  }
  render(){
    return (
      <div className="App">
      
      <Bar
          data={this.state}
          options={{
            title:{
              display:true,
              text:'Engineering Colleges in India',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            onClick:this.callback
    }}
    />
     <p id="collegelist" >
    
      <React.Fragment>
        <ul className="list-group">
          {this.state.listitems.map(listitem => (
            <li className="list-group-item list-group-item-primary">
              {listitem}
            </li>
          ))}
        </ul>
      </React.Fragment>

    
     </p>
    
      </div>
      
    );
  }
}

export default App;
