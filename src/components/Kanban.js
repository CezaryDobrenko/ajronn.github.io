import React from 'react'
import Swimlane from './Swimlane'
import {DragDropContext} from 'react-beautiful-dnd'
import defaultAvatar from '../avatars/default.png'
import Ricky from '../avatars/ricky.jpg'
import Julian from '../avatars/julian.jpeg'
import Bubbles from '../avatars/bubbles.jpg'
import ParkingOpen from "../img/parkingopen.png"
import ParkingClose from "../img/parkingclose.png"
import SwimlaneIcon from '../img/swimlane.png'
import "../css/kanban.css"
import ParkingLot from "./ParkingLot"


class Kanban extends React.Component{
    state = {
        slideMenuActive: false,
        users: [
            {name: "Ricky", avatar: Ricky, wiplimit: 1},
            {name: "Julian", avatar: Julian, wiplimit: 3},
            {name: "Bubbles", avatar: Bubbles, wiplimit: 2},
        ],
        noteid: 4,
        columnid: 2,
        swimlaneid: 1,
        swimlanes: [
            {id: 'swimlane0', title: 'John'}
        ],
        
        columns: [
            {id: "parkinglot", swimlaneid:"parkinglot",title: "",wiplimit: 0,info: "", notes: [
                {id: "note3", columnid: "parkinglot",avatar:Ricky,contents: "Send Cory to work", progress: 0, color: "yellow", block: false, enable: true}
            ]},
            {id: "column0", swimlaneid:"swimlane0",title: "Backlog",wiplimit: 0,info: "None",
            notes: [
                {id: "note1", columnid: "column0",avatar:Ricky,contents: "Recover my car!", progress: 0, color: "yellow", block: false, enable: true},
                {id: "note2", columnid: "column0",avatar:Julian,contents: "Make drink", progress: 0, color: "yellow", block: false, enable: true}
            ]},
            {id: "column1", swimlaneid:"swimlane0",title: "In progress",wiplimit: 3,info: "Start task",
            notes: [
                {id: "note0", columnid: "column0",avatar:Bubbles,contents: "Feed kitties", progress: 10, color: "yellow", block: false, enable: true},
            ]}
        ]

    }

    changeNoteStatus(noteid){
        const copyOfColumns = this.state.columns
        copyOfColumns.map(e => {
            e.notes.map(e => {
                if(e.id === noteid){
                    e.enable = !e.enable
                }
            })
        })

        this.setState({columns: copyOfColumns})


    }

    changeUserLimit(user, limit){
        const copyOfUsers = this.state.users;
        copyOfUsers.map(e => {
            if(e.name == user)
                e.wiplimit = limit;
        })

        this.setState({users: copyOfUsers});
    }

    checkUserLimit(){
        
        this.state.users.map(e => {
            let user = e.avatar;
            let limit = 0;
            this.state.users.map(e => {
                if(e.avatar === user)
                    limit = e.wiplimit;
            })

            let counter = 0;
            this.state.columns.map(col => {
                col.notes.map(no => {
                    
                    if(no.avatar === user && no.columnid != "parkinglot")
                        counter++;
                })
            })

    

                const copyOfColumns = this.state.columns
                copyOfColumns.map(e => {
                    e.notes.map(e => {
                        console.log(e.avatar)
                        if(e.avatar === user && counter > limit && e.columnid != "parkinglot"){
                            e.block = true;
                        }
                        if(e.avatar === user && counter <= limit ){
                            e.block = false;
                        }
                    })
                })

                this.setState({columns: copyOfColumns})
        })

        

    }


    changeColor(noteid, color){
        const copyOfColumns = this.state.columns
        copyOfColumns.map(e => {
            e.notes.map(e => {
                if(e.id === noteid){
                    e.color = color
                }
            })
        })

        this.setState({columns: copyOfColumns})


    }

    changeColumnInfo(columnid, i){
        
        //let info = i.replace(String.fromCharCode(10),<br />)
        let info = i.replace(/(\r\n|\n|\r)/gm,"<br />")

        const copyOfColumns = this.state.columns
        copyOfColumns.map(e => (e.id === columnid ? e.info = info : e))
        this.setState({columns: copyOfColumns})
    }


    changeSwimlaneTitle(swimlane, title){
        let copyOfSwimlanes = this.state.swimlanes
        copyOfSwimlanes.map(e => {
            if(e.id == swimlane.id){
                e.title = title;
            }
        })

        this.setState({swimlanes: copyOfSwimlanes})
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

            if(source.droppableId != destination.droppableId)
                item.progress = 0;

            const copyOfColumns = this.state.columns
            copyOfColumns.map(e => {
                if(e.id === source.droppableId){
                    e.notes.splice(source.index,1)
                }
            })
            item.columnid = destination.droppableId;
            copyOfColumns.map(e => {
                if(e.id === destination.droppableId){
                    e.notes.splice(destination.index,0,item)
                }
            })

            this.setState({columns: copyOfColumns})
        }
        this.checkUserLimit()

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

    addColumn(title){
        
            let i = this.state.columnid;
            let newColumns = []
            this.state.swimlanes.map( e => {

                    let col = {
                        id: 'column'+i,
                        swimlaneid: e.id,
                        title: title,
                        wiplimit: 0,
                        info: "None",
                        notes: []
                    }
                    newColumns.push(col)
                    i++;

            })
            this.setState({columnid: i})
            let sumOfColumns = [...this.state.columns, ...newColumns];
            this.setState({columns: sumOfColumns});



    }

    addNote(columnid){
        const item = {
            id: 'note'+this.state.noteid,
            columnid: columnid,
            avatar: defaultAvatar,
            contents: "",
            progress: 0,
            color: "yellow",
            block: false,
            enable: true
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
        if(this.state.columns.length>0 && this.state.swimlanes.length>0){
            let swimlaneid = this.state.swimlanes[0].id;
            let columnsTitles = [];
            let i = this.state.columnid;
            this.state.columns.map( e => {
                if(e.swimlaneid == swimlaneid){
                    let col = {
                        id: 'column'+i,
                        swimlaneid: 'swimlane'+this.state.swimlaneid,
                        title: e.title,
                        wiplimit: e.wiplimit,
                        info: "Empty",
                        notes: []
                    }
                    columnsTitles.push(col)
                    
                    i++;
                }

            })

            let newColumns = [...this.state.columns, ...columnsTitles];
            this.setState({columns: newColumns});
            this.setState({columnid: i});


            
        }
        
        

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

    
    hoverMenu(){

        this.setState({slideMenuActive: !this.state.slideMenuActive})

    }

    render(){
        
        const elements = this.state.swimlanes.map(e => {
            return(
                <div key={e.id}>
                    <Swimlane element={e} columns={this.state.columns} addNote={this.addNote.bind(this)}
                    addColumn={this.addColumn.bind(this)} removeSwimlane={this.removeSwimlane.bind(this)}
                    reloadNotesState={this.reloadNotesState.bind(this)} changeColumnTitle={this.changeColumnTitle.bind(this)}
                    changeProgress={this.changeProgress.bind(this)} removeColumn={this.removeColumn.bind(this)} removeNote={this.removeNote.bind(this)}
                    changeColumnWIPLimit={this.changeColumnWIPLimit.bind(this)} changeSwimlaneTitle={this.changeSwimlaneTitle.bind(this)}
                    changeColumnInfo={this.changeColumnInfo.bind(this) } changeColor={this.changeColor.bind(this)} checkUserLimit={this.checkUserLimit.bind(this)}
                    changeNoteStatus={this.changeNoteStatus.bind(this)} />
                </div>
            )
        })
        

        return(
            
<div>
<DragDropContext onDragEnd={result => this.onDragEnd(result)} >

    <ParkingLot slideMenuActive={this.state.slideMenuActive} notes = {this.state.columns[0].notes} changeNoteStatus={this.changeNoteStatus.bind(this)} 
    checkUserLimit={this.checkUserLimit.bind(this)} changeColor={this.changeColor.bind(this)} 
    removeNote={this.removeNote.bind(this)} changeProgress={this.changeProgress.bind(this)}
    reloadNotesState={this.reloadNotesState.bind(this)}/>
    
    
    <div className={this.state.slideMenuActive ? "content pushed" : "content"}>
                    

                    <div>
                        <div className="steericon" onClick= {() => this.hoverMenu()}><img className="box" src={!this.state.slideMenuActive ? ParkingClose : ParkingOpen} height="40"/>
                            <div style={{position: "absolute", zIndex: "10", bottom: "0", left: "37px", color: "#33adff", fontWeight: "700"}}>{this.state.columns[0].notes.length}</div>
                            
                        </div><p className="headertext" style={{marginLeft: "10px"}}>{this.state.slideMenuActive ? "Close box" : "Open box"}</p>

                        <div className="steericon" onClick = {this.addSwimlane.bind(this)}><img src={SwimlaneIcon} height="40" /></div> <p className="headertext">Add swimlane</p>
                        <p className="uniteam">Kanban powered by Uniteam</p>
                    </div>
                    
                        {elements}
                    {/*
                    <div style={{width: "150px", marginLeft: "100px", border: "1px solid black", marginTop: "1800px"}}>
                        <input type="text" placeholder="Ricky WIP limit" onChange={(e) => this.changeUserLimit("Ricky", e.target.value)} />
                        <input type="text" placeholder="Julian WIP limit" onChange={(e) => this.changeUserLimit("Julian", e.target.value)} />
                        <input type="text" placeholder="Bubbles WIP limit" onChange={(e) => this.changeUserLimit("Bubbles", e.target.value)} />
                    </div>*/}

    </div>
    </DragDropContext>
</div>
            
        )
    }
}

export default Kanban;
