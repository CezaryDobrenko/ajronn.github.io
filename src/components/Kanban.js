import React from 'react'
import Swimlane from './Swimlane'



class Kanban extends React.Component {
    
    state = {
        swimlineid: 1,
        columnid: 1,
        swimlines: [
            {id: 0, title: 'John'}
        ],
        columns: [],

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

    changeTitle(e,v){
        var index = this.state.swimlines.indexOf(e)
        let a = this.state.swimlines.slice()
        a[index] = v
        this.setState({swimlines: a})
    }

    addColumn(){
        if(this.state.swimlines.length !== 0)
        {
            this.setState({columnid: this.state.columnid +1 })
        
            const item = {
                id: this.state.columnid,
                wiplimit: null
            }

            const newElements = [...this.state.columns, item]
            this.setState({columns: newElements})
        }

    }
    
    render(){

            const elements = this.state.swimlines.map(e => {
                return <Swimlane element={e} columns={this.state.columns} changeTitle={this.changeTitle.bind(this)} removeSwimlane={this.removeSwimlane.bind(this)}/>
            })

            return(
                <div>
                    <button onClick={this.addColumn.bind(this)}>Add column</button>
                    <button onClick={this.addSwimlane.bind(this)}>Add swimlane</button>
                    

                    {elements}

                    
                    
                </div>
                
            )
            
    }
}

export default Kanban