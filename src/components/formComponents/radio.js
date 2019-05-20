
import React, { Component } from 'react';


class Radio extends Component{

  constructor(props){
    super(props)
    this.state = {
      activeOptionId: this.props.activeOptionId

    }

    this.activateOption = this.activateOption.bind(this);
  }

  activateOption(evt,id,key){

    this.props.updateWheelConfig(evt,id,key); //update wheel configuration in parent
    this.updateActiveOptionId(id,key); //update the active option being displayed in dd
  }

  updateActiveOptionId(id){
    this.setState({activeOptionId:id})
  }


  render(){

    const{list, label} = this.props
    const{activeOptionId} = this.state

    return(

      <div>
        <label htmlFor="radio-list-bracket" className="beige antique radio-label">{label}</label>
                 <ul id="radio-list-bracket" className="radio-list">
                  {list.map((option) => (
                   <li className={list[activeOptionId].plateType === option.plateType ? 'radio-list-item plate-type active' : 'radio-list-item plate-type'}
                       key={option.plateType}
                       data-id={option.id}
                       onClick={(evt) => this.activateOption(evt, option.id, option.key)} >
                          <h2 className="black light">{option.plateType}</h2>
                   </li>
                  ))}
                </ul>

    </div>

    );
  }

}
export default Radio;
