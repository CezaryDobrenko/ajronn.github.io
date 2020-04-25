import React from 'react'
import Collapsible from 'react-collapsible'
import Popup from "reactjs-popup"
import AddColumnInput from "./AddColumnInput"
import '../css/swimlane.css'
import Column from './Column.js'

class Swimlane extends React.Component{   
    
    render(){
        const elements = this.props.columns
        .filter((e) => e.swimlaneid === this.props.element.id)
        .map(e => {
            return(
                <div key = {e.id}>
                    <Column id={e.id} title={e.title} notes= {this.props.notes} addNote={this.props.addNote} setColumnidTo={this.props.setColumnidTo} moveNote={this.props.moveNote}/>
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
                                <AddColumnInput addColumn={this.props.addColumn} swimlaneid = {this.props.element.id}/>
                            </div>
                        </div>
            </Collapsible>
            </div>
       )
   }
}
    
export default Swimlane;