import React from 'react'
import Swimlane from './Swimlane'
class Kanban extends React.Component{
    state = {
        swimlineid: 1,
        swimlines: [
            {id: 0, title: 'John'}
        ],

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
            return <Swimlane element={e} removeSwimlane={this.removeSwimlane.bind(this)}/>
        })

        return(
            <div>
                <button onClick = {this.addSwimlane.bind(this)}> add swimline</button>
                {elements}
            </div>
        )
    }
}

export default Kanban;
