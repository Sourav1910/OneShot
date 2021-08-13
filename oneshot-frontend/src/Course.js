import React from 'react';
import {Bar,Doughnut} from 'react-chartjs-2';
import { render } from 'react-dom';

class Course extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      labels: [],
      datasets: [
        {
          label: 'Courses Offered ',
          backgroundColor: 'rgba(149,76,202,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: []
        }
      ]
    }
  }

  callApi(){
    fetch("http://localhost:3001/getCoursePercentage")
    .then(res=> res.json())
    .then(res=>{
    //   console.log("This is our current state" )
    //   console.log(this.state)
    //   console.log("This is our Response" )
    //   console.log(res)
    //   console.log("This is my State" )
    //   console.log(this.state)
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


  render(){
    return (
      <div className="Course">
      
      <Bar
          data={this.state}
          options={{
            title:{
              display:true,
              text:'Courses Offered ',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      

      </div>
    );
  }
}

export default Course;
