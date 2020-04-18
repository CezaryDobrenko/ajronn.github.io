import React from 'react'
import Collapsible from 'react-collapsible'
import Draggable from "../dnd/draggable"
import Droppable from "../dnd/droppable"
import Popup from "reactjs-popup"
import AddColumnInput from "./AddColumnInput"
import './swimlanecss.css'


class Swimlane extends React.Component{

    constructor(props){
        super(props);
    }

    state = {
        columnid: 0,
        columns: []

        
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
            return <Droppable id={e.id} style={this.droppableStyle}><input style={{width: "70%", display: "block", marginLeft: "auto", marginRight: "auto"}} defaultValue={e.title}></input></Droppable>
        })



       return (
           <div>
            <Collapsible trigger={<div><Popup trigger={<button>Trigger</button>} position="right center">
                <input type="text" defaultValue={this.props.element.title}/>
                <button onClick={() => this.props.removeSwimlane(this.props.element)}>Remove swimlane</button>
                </Popup></div>}>
                    
                        <div className="columnfield">
                            {elements}
                            <div className="addcolumnfield">
                                <AddColumnInput addColumn={this.addColumn.bind(this)}/>
                            </div>
                        </div>
            </Collapsible>
            </div>
       )
   }
}
    
export default Swimlane;