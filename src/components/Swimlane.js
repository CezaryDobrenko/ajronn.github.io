import React, {Component} from 'react'
import Kanban from './Kanban'
class Swimlane extends React.Component{
    state = {
        list:[]
    }
    addSwimlane=(e)=>{
        const list = this.state.list;
        this.setState({
            list: list.concat(<Kanban/>)

        })
    }
    render(){
        return(
            <div>
                <button onClick = {this.addSwimlane}> add swimline</button>
                {this.state.list}
            </div>
        )
    }
}

export default Swimlane;
