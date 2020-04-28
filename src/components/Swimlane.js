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
        .map((e,index) => {
            return(
                <div key = {e.id}>
                    <Column changeProgress={this.props.changeProgress} changeColumnTitle={this.props.changeColumnTitle} element={e} index={index} title={e.title} addNote={this.props.addNote} reloadNotesState={this.props.reloadNotesState}/>
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