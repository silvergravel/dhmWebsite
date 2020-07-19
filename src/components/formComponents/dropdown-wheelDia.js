
import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";

import ChevronDown from '../../images/chevron-down.svg';
import ChevronUp from '../../images/chevron-up.svg';


class DropdownWheelDia extends Component{

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

    let activeListOp = list[activeOptionId] ? list[activeOptionId] : list[0];

    return(

      <div className="dd-wrapper dd-wheel-dia">
        <label htmlFor="dd-select-wheel-dia" className="beige antique dd-label">{label}</label>
          <div id="dd-select-wheel-dia" className="dd-select dd-wheel-dia" onClick={() => this.toggleList()}>

                <div className="dd-activeOption dd-flex-wrapper dd-wheel-dia">
                  <h2 className="black light dd-activeTitle dd-wheel-dia">{activeListOp.wheelDiameter}</h2>
                  <h2 className="black light dd-activeSubTitle dd-wheel-dia">{activeListOp.loadCapacity}</h2>
                  <div className="dd-chevron dd-wheel-dia">
                     {listOpen
                        ? <img src={ChevronUp} alt=""/>
                        : <img src={ChevronDown} alt=""/>
                     }
                  </div>
                </div>

              {listOpen &&
                 <ul className="dd-list dd-wheel-dia">
                  {list.map((option) => (
                   <li className={activeListOp.wheelDiameter === option.wheelDiameter &&
                                  activeListOp.loadCapacity === option.loadCapacity ?
                                  'dd-list-item dd-flex-wrapper dd-wheel-dia active' :
                                  'dd-list-item dd-flex-wrapper dd-wheel-dia'}
                       key={option.wheelDiameter}
                       data-id={option.id}
                       onClick={(evt) => this.activateOption(evt, option.id, option.key)} >
                  <div>
                    <h2 className="black light dd-list-item--title dd-wheel-dia">
                      {option.wheelDiameter}
                      { option.showTreadWidthInDD &&
                        <span
                          className='h6 beige medium'
                          style={{marginLeft: '5px'}}
                          >{`( ${option.treadWidth} )`}
                        </span> }
                    </h2>
                  </div>
                   <h2 className="black light dd-list-item--sub-title dd-wheel-dia">
                     {option.loadCapacity}
                   </h2>
                   </li>
                  ))}
                </ul>
              }
          </div>



    </div>

    );
  }

}
export default onClickOutside(DropdownWheelDia);
