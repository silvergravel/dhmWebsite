
import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";

import ChevronDown from '../../images/chevron-down.svg';
import ChevronUp from '../../images/chevron-up.svg';


class DropdownMaterial extends Component{

  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      activeOptionId: this.props.activeOptionId
    }



    this.toggleList = this.toggleList.bind(this);
    this.activateOption = this.activateOption.bind(this);
  }

  activateOption(evt,id,key){

    this.props.updateWheelConfig(evt,id,key); //update wheel configuration in parent
    this.updateActiveOptionId(id,key); //update the active option being displayed in dd
    // this.setState({listOpen:false}); //shut the dropdown
  }

  updateActiveOptionId(id){
    this.setState({activeOptionId:id})
  }

  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){



    const{list, label} = this.props
    const{listOpen, activeOptionId} = this.state

    return(

      <div className="dd-wrapper dd-material">
        <label htmlFor="dd-select-material" className="beige antique dd-label">{label}</label>
          <div id="dd-select-material"className="dd-select dd-material" onClick={() => this.toggleList()}>
              <div className="dd-activeOption dd-material">
                <div className="dd-flex-wrapper dd-material">
                  <h2 className="black light dd-activeTitle dd-material">{list[activeOptionId].material}</h2>
                  <div className="dd-chevron dd-material">
                     {listOpen
                        ? <img src={ChevronUp} alt=""/>
                        : <img src={ChevronDown} alt=""/>
                     }
                  </div>
                </div>
                <h4 className="black medium dd-activeSubTitle dd-material">{list[activeOptionId].materialDescp}</h4>
              </div>
              {listOpen &&
                 <ul className="dd-list dd-material">
                  {list.map((option) => (
                   <li className={list[activeOptionId].material === option.material ? 'dd-list-item dd-material active' : 'dd-list-item dd-material'}
                       key={option.material}
                       data-id={option.id}
                       onClick={(evt) => this.activateOption(evt, option.id, option.key)} >
                   <h2 className="black light dd-list-item--title dd-material">{option.material}</h2>
                   <h4 className="black medium dd-list-item--sub-title dd-material">{option.materialDescp}</h4>
                   </li>
                  ))}
                </ul>
              }
          </div>



    </div>

    );
  }

}

export default onClickOutside(DropdownMaterial);
