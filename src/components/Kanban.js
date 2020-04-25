import React from 'react'
import Swimlane from './Swimlane'

class Kanban extends React.Component{
    state = {
        idnumber: 0,
        swimlineid: 1,
        swimlines: [
            {id: 0, title: 'John'}
        ],

    }

    incrementNoteIdNumber(){
        this.setState({idnumber: this.state.idnumber+1})
    }

    addSwimlane(){
        this.setState({swimlineid: this.state.swimlineid +1 })
        
        const item = {
            id: this.state.swimlineid,
            title: ""
        }

        const newElements = [...this.state.swimlines, item]
        this.setState({swimlines: newElements})

    }

    removeSwimlane(e){
        var array = [...this.state.swimlines]
        var index = array.indexOf(e)

        if(index !== -1){
            array.splice(index,1);
            this.setState({swimlines: array})
        }
    }

    render(){
        const elements = this.state.swimlines.map(e => {
            return(
                <div key={e.id}>
                    <Swimlane element={e} removeSwimlane={this.removeSwimlane.bind(this)} incrementNoteIdNumber={this.incrementNoteIdNumber.bind(this)} idnumber={this.state.idnumber}/>
                </div>
            )
        })

        return(
            <div>
                <button onClick = {this.addSwimlane.bind(this)}> add swimlane</button>
                {elements}
                
            </div>
        )
    }
}

export default Kanban;
