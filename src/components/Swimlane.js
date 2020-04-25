import React from 'react'
import Collapsible from 'react-collapsible'

import Popup from "reactjs-popup"
import AddColumnInput from "./AddColumnInput"
import '../css/swimlane.css'
import Column from './Column.js'


class Swimlane extends React.Component{

    state = {
        columnid: 0,
        columns: [
            {id: "0", wiplimit: null, title: "Backlog"}
        ]
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
            return(
                <div key = {e.id}>
                    <Column id={e.id} title={e.title} idnumber={this.idnumber} incrementNoteIdNumber={this.props.incrementNoteIdNumber} idnumber={this.props.idnumber} />
                </div>
            )
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