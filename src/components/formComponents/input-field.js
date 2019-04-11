
import React, { Component } from 'react';



class InputField extends Component{

  constructor(props){
    super(props)

    this.activateOption = this.activateOption.bind(this);
  }

  activateOption(evt){
    this.props.updateInput(evt); //update wheel configuration in parent
  }


  render(){



    const{updateInput, label, type, name} = this.props


    return(
      <div>
        <label for="input" className="beige antique input-label">{label}</label>
        <div className="input-block">
          <input id="input" type={type} name={name} onChange={(evt) => this.activateOption(evt)} />
        </div>
      </div>
    );
  }

}
export default InputField;
