import React from 'react'
import Collapsible from 'react-collapsible'
import Draggable from "../dnd/draggable"
import Droppable from "../dnd/droppable"
import Popup from "reactjs-popup"
import AddColumnInput from "./AddColumnInput"


class Swimlane extends React.Component{

    constructor(props){
        super(props);
    }

    state = {
        columnid: 0,
        columns: [
            {id: "0", wiplimit: null, title: "Backlog"}

        ]

        
    }

    
    
    droppableStyle = {
        backgroundColor: "rgb(70,83,98)",
        height: "250px",
        width: "200px",
        margin: "15px",
        float: "left",
        borderRadius: "20px"
    }
    
    addColumn(v){
        this.setState({columnid: this.state.columnid +1 })
        
        const item = {
            id: this.state.columnid,
            wiplimit: null,
            title: v
        }

        const newElements = [...this.state.columns, item]
        this.setState({columns: newElements})

    }

    


    render(){
        const elements = this.state.columns.map(e => {
            return <Droppable id={e.id} style={this.droppableStyle}><input style={{width: "70%", display: "block", marginLeft: "auto", marginRight: "auto"}}value={e.title}></input></Droppable>
        })



       return (
           <div>
            <Collapsible trigger={<div><Popup trigger={<button>Trigger</button>} position="right center">
            <input style={{width: "150px", height: "20px"}}type="text" defaultValue={this.props.element.title}></input>
            <button onClick={() => this.props.removeSwimlane(this.props.element)}>Remove swimlane</button>
            </Popup></div>}>
                
                    <div style={{height: "300px", /*backgroundColor: "#ccc"*/}}>{elements}<div style={{backgroundColor: "rgb(70,83,98)", width: "200px", height: "50px", float: "left", margin: "15px", borderRadius: "20px"}}><AddColumnInput addColumn={this.addColumn.bind(this)}/></div></div>
            </Collapsible>
            </div>
       )
   }
}
    
export default Swimlane;