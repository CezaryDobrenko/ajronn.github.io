import React from "react"

export default class AddColumnInput extends React.Component {
    
    _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        {this.props.addColumn(e.target.value)}
        e.target.value = ""
      }
    }
  
    render() {
      return <input style={{width: "70%", display: "block", marginLeft: "auto", marginRight: "auto"}} type="text" placeholder="Add column" onKeyDown={this._handleKeyDown} />
    }
  }