import React from "react"
import Enter from "../img/enter.png"

export default class AddColumnInput extends React.Component {
    
    _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        this.props.addColumn(e.target.value)
        e.target.value = ""
      }
    }
  
    render() {
      return(
        <div>
          <input style={{width: "60%", display: "inline-block",
          marginLeft: "20px",fontFamily: "'Courgette', cursive",
          color: "white", fontSize: "15px", textAlign: "center"}} type="text" placeholder="Add column" onKeyDown={this._handleKeyDown} />
          <img style={{verticalAlign: "middle", marginLeft: "10px"}} src={Enter} height="30"/>
        </div>
      )

    }
  }