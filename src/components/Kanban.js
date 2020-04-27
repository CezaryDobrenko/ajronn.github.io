import React, { useState } from 'react'
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
        notes: [
            {id: "note0", columnid: "column0",avatar:defaultAvatar }
        ],
        columns: [
            {id: "column0", swimlaneid:"swimlane0",title: "Backlog"}
        ]

    }

    onDragEnd(result){
        if (!result.destination) return;
        if(result.destination.droppableId != null && result.source.droppableId != null)
        {
            this.setState({
                notes: this.state.notes.map(e => {
                    if(e.id == result.draggableId){
                        e.columnid = result.destination.droppableId
                    }
                })
            })

            
        }
        

    }

    moveNote(note){
        if(note != null && note.id != this.state.columnidto){
            this.state.notes.map(e => (e.id === note.id ? e.columnid = this.state.columnidto : null))
        }
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
            title: title
        }
        const newElements = [...this.state.columns, item]
        this.setState({columns: newElements})
        this.setState({columnid: this.state.columnid +1 })
    }

    addNote(columnid){
        const item = {
            id: 'item'+this.state.noteid,
            columnid: columnid
            ,avatar: defaultAvatar
        }
        const newElements = [...this.state.notes, item]
        this.setState({notes: newElements})
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
                    <Swimlane element={e} columns={this.state.columns} notes={this.state.notes} addNote={this.addNote.bind(this)} addColumn={this.addColumn.bind(this)} removeSwimlane={this.removeSwimlane.bind(this)} setColumnidTo={this.setColumnidTo.bind(this)} moveNote={this.moveNote.bind(this)}/>
                </div>
            )
        })

        return(
            <DragDropContext onDragEnd={result => this.onDragEnd(result)}>

                <button onClick = {this.addSwimlane.bind(this)}> add swimlane</button>
                {elements}

            </DragDropContext>
        )
    }
}

export default Kanban;
