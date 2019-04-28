
import React, { Component } from 'react';



class Checkbox extends Component{

  constructor(props){
    super(props)
  }

  activateOption(evt){
    this.props.updateInput(evt); //update wheel configuration in parent
  }


  render(){

    const{updateInput, label, checked, disabledClass, name} = this.props
    // console.log(disabledClass);

    var disabledAttr = {};

    //condition to toggle the disabled attribute on nthe checkbox input
    if(disabledClass === "disabled"){
      // console.log("we have a disabled");
      disabledAttr['disabled'] = 'disabled';
    } else{
      // console.log("nop!");
    }

    return(
      <div className={'checkbox-block '+ disabledClass}>
        <input
          id="brakingCheckbox"
          className="checkbox"
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(evt) => this.activateOption(evt)}
          {...disabledAttr}/>

         <label htmlFor="brakingCheckbox" className="black medium " >{label}</label>
      </div>
    );
  }

}
export default Checkbox;
