
import React, { Component } from 'react';



class Checkbox extends Component{

  constructor(props){
    super(props)



  }

  activateOption(evt){
    this.props.updateInput(evt); //update wheel configuration in parent
  }


  render(){



    const{updateInput, label, checked, blockClass, name} = this.props


    return(
      <div className={'checkbox-block '+ blockClass}>
        <input
          id="brakingCheckbox"
          className="checkbox"
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(evt) => this.activateOption(evt)} />

         <label for="brakingCheckbox" className="black medium" >{label}</label>
      </div>
    );
  }

}
export default Checkbox;
