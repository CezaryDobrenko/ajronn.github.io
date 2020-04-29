import React from 'react'
import Swimlane from './Swimlane'
import {DragDropContext} from 'react-beautiful-dnd'
import defaultAvatar from '../avatars/default.png'

class Kanban extends React.Component{
    state = {
        noteid: 1,
        columnid: 1,
        swimlaneid: 1,
        swimlanes: [
            {id: 'swimlane0', title: 'John'}
        ],
        
        columns: [
            {id: "column0", swimlaneid:"swimlane0",title: "Backlog",wiplimit: 0, notes: [{id: "note0", columnid: "column0",avatar:defaultAvatar,contents: "", progress: 10 }]}
        ]

    }

    changeColumnWIPLimit(columnid, wip){
        let wiplimit;
        if(wip>=0){
            wiplimit = wip
        }
        else{
            wiplimit = 0;
        }
        const copyOfColumns = this.state.columns
        copyOfColumns.map(e => (e.id === columnid ? e.wiplimit = wiplimit : e))
        this.setState({columns: copyOfColumns})
    }

    removeNote(note, columnid){
        const copyOfColumns = this.state.columns
        let copyOfColumn;
        copyOfColumns.map(e =>{
            if(e.id == columnid){
                copyOfColumn = e;
            }
        })

        let i = copyOfColumn.notes.indexOf(note)
        copyOfColumn.notes.splice(i,1)
        copyOfColumns.map(e =>{
            if(e.id == columnid){
                e=copyOfColumn
            }
        })
        this.setState({columns: copyOfColumns})
    }

    removeColumn(columnid){
        const copyOfColumns = this.state.columns

        var columnindex
        copyOfColumns.map( (e,index) => {
            if(e.id === columnid){
                columnindex = index;
            }
        })
        
        copyOfColumns.splice(columnindex,1)

        this.setState({columns: copyOfColumns})
    }

    changeProgress(noteid, value){
        const copyOfColumns = this.state.columns
        copyOfColumns.map(e => {
            e.notes.map(e => {
                if(e.id === noteid){
                    e.progress = value
                }
            })
        })

        this.setState({columns: copyOfColumns})
    }

    changeColumnTitle(columnid, title){
        const copyOfColumns = this.state.columns
        copyOfColumns.map(e => (e.id === columnid ? e.title = title : e))
        this.setState({columns: copyOfColumns})
    }

    onDragEnd(result){
        if (!result.destination) return;
        if(result.destination.droppableId != null && result.source.droppableId != null)
        {
            const {source,destination} = result;

            var item;
            this.state.columns.map(e => {
                if(e.id === source.droppableId){
                    e.notes.map(e => {
                        if(e.id === result.draggableId)
                            item = e;
                    })
                }
            })
            
            const copyOfColumns = this.state.columns
            copyOfColumns.map(e => {
                if(e.id === source.droppableId){
                    e.notes.splice(source.index,1)
                }
            })
            
            copyOfColumns.map(e => {
                if(e.id === destination.droppableId){
                    e.notes.splice(destination.index,0,item)
                }
            })

            this.setState({columns: copyOfColumns})
        }
       

    }

    reloadNotesState(){
        this.setState({notes: this.state.notes})
    }


    setColumnidTo(columnid, note){
        this.setState({columnidto: columnid})
        

        if(note != null){
            this.setState({noteidto: note.id})
            this.state.notes.map(e => (e.id === note.id ? e.columnid = this.state.columnidto : null))
        }
    }

    addColumn(swimlaneid, title){
        
        const item = {
            id: 'column'+this.state.columnid,
            swimlaneid: swimlaneid,
            title: title,
            notes: [],
            wiplimit: 0
        }
        const newElements = [...this.state.columns, item]
        this.setState({columns: newElements})
        this.setState({columnid: this.state.columnid +1 })
    }

    addNote(columnid){
        const item = {
            id: 'note'+this.state.noteid,
            columnid: columnid,
            avatar: defaultAvatar,
            contents: "",
            progress: 0
        }

        const copyOfColumns = this.state.columns
        copyOfColumns.map(e => {
            if(e.id === columnid)
                e.notes = [...e.notes,item]
        })

        

        
        this.setState({columns: copyOfColumns})
        this.setState({noteid: this.state.noteid+1})
    }


    addSwimlane(){      
        const item = {
            id: 'swimlane'+this.state.swimlaneid,
            title: ""
        }
        const newElements = [...this.state.swimlanes, item]
        this.setState({swimlanes: newElements})
        this.setState({swimlaneid: this.state.swimlaneid +1 })

    }

    removeSwimlane(e){
        var array = [...this.state.swimlanes]
        var index = array.indexOf(e)

        if(index !== -1){
            array.splice(index,1);
            this.setState({swimlanes: array})
        }
    }

    render(){
        
        const elements = this.state.swimlanes.map(e => {
            return(
                <div key={e.id}>
                    <Swimlane element={e} columns={this.state.columns} addNote={this.addNote.bind(this)}
                    addColumn={this.addColumn.bind(this)} removeSwimlane={this.removeSwimlane.bind(this)}
                    reloadNotesState={this.reloadNotesState.bind(this)} changeColumnTitle={this.changeColumnTitle.bind(this)}
                    changeProgress={this.changeProgress.bind(this)} removeColumn={this.removeColumn.bind(this)} removeNote={this.removeNote.bind(this)}
                    changeColumnWIPLimit={this.changeColumnWIPLimit.bind(this)}/>
                </div>
            )
        })

        return(
            <div>
                <DragDropContext onDragEnd={result => this.onDragEnd(result)}>
                    <button onClick = {this.addSwimlane.bind(this)}> add swimlane</button>
                    {elements}
                </DragDropContext>
                
            </div>
            
        )
    }
}

export default Kanban;
