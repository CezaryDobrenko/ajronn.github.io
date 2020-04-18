import React from 'react'
import Collapsible from 'react-collapsible'
import Draggable from "../dnd/draggable"
import Droppable from "../dnd/droppable"
import Popup from "reactjs-popup"

class Swimlane extends React.Component{

    constructor(props){
        super(props);
    }

    state = {
        columnid: 0,
        columns: [
            {id: "0", wiplimit: null}

        ]

        
    }
    
    addColumn(){
        this.setState({columnid: this.state.columnid +1 })
        
        const item = {
            id: this.state.columnid,
            wiplimit: null
        }

        const newElements = [...this.state.columns, item]
        this.setState({columns: newElements})

    }


    render(){
        const elements = this.state.columns.map(e => {
            return <Droppable id={e.id} style={{backgroundColor: 'red', width: "100px", height: "100%", float: "left", margin: "5px"}}></Droppable>
        })

       return (
           <div>
            <Collapsible trigger={<div><Popup trigger={<button>Trigger</button>} position="right center">
            <input style={{width: "150px", height: "20px"}}type="text" defaultValue={this.props.element.title}></input>
            <button onClick={() => this.props.removeSwimlane(this.props.element)}>Remove swimlane</button>
            <button onClick={() => this.addColumn(this.props.element)}>Add column</button></Popup></div>}>
                <Draggable id="item1"><div style={{backgroundColor: 'gray', width: '100px'}}>Some text</div></Draggable>
                <div style={{height: "300px", backgroundColor: "#f3e5ab"}}>{elements}</div>
            </Collapsible>
            </div>
       )
   }
}
    
export default Swimlane;