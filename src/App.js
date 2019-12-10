import React, { Component } from 'react';
import classes from './App.module.scss';
// this file is uploading Material-icons
import '../node_modules/material-icons/iconfont/material-icons.scss'; 

class App extends Component {

  state = {
    newItem: '',
    lists: [],
  }



  addUp = event => {
    // this func is adding the new Item, and take in parameter

    const newItem = {
      id: 1 + Math.random(),
      indicator: false,
      value: event.target.value
    };
    
    this.setState({
      newItem: newItem
    })
  }


  triggerButton = event => {
    // add new item by Enter

    const code = event.keyCode || event.which;

    if( !(code === 13) ) return;

    // copy the list
    const lists = [...this.state.lists];

    // also copy the newItem

    const newItem = {...this.state.newItem}

    // now push it to the lists obj

    lists.unshift(newItem);

    // Clear input value, so that would ready for next entry

    event.target.value = '';

    // Update the DOM
    this.setState({
      lists: lists
    });
    
  }



  close = value => {
    
    // this function for closing the task which means mark it done


    // copy the lists
    const lists = [...this.state.lists];

    // get the Id of the match value
    const id = lists.findIndex( item => {
      return item.value === value
    });


    // set the indicator to true
    const updatedIds = {
      ...lists[id],
      indicator: true
    }


    // get it together
    lists[id] = {
      ...updatedIds
    }


    // last Re-render the DOM
    this.setState({
      lists: lists
    });
  }


  
  delete = (value) => {
    // for deleting the item from the list forevery, so be clever, lol

    // copy the list, same as alwasy because it's mutable value

    const lists = [...this.state.lists];

    // delete the current one

    const Filtered = lists.filter( item => {
      return item.value !== value
    });
console.log(Filtered)
    // re-render it
    this.setState({
      lists: Filtered
    });
  }


  render () {

    // Destructure the obj

    const { newItem, lists } = this.state;

    return (
      <div className={classes.main}>

        <h1 className={classes.header}> Todo List Once Again</h1>

        <div className={classes.main__todoBox}>

          <input 
            className={classes.main__input}
            type="input"
            placeholder="Add Item here.."
            onChange={this.addUp}
            onKeyPress={this.triggerButton}
          />

            <div className={classes.main__todoList}>
              { lists.map( item => {
                return (
                  <p key={item.id} 
                    className={ item.indicator === true ? classes.main__close : ' ' + classes.main__content}
                  >
                    { /* InnerHTML  */}
                    { item.value.length > 33 ? item.value.slice(0, 33) + '...' : item.value}
                    
                    <span className={classes.main__actions}>
                      <i 
                        className={'material-icons ' + classes.warnin}
                        onClick={ () => this.close(item.value) }
                      >close</i>
                      <i 
                        className={'material-icons ' + classes.danger}
                        onClick={() => this.delete(item.value)}
                      >delete</i>
                    </span>

                  </p>
                );
              }) }
            </div>
        </div>


      </div>
    );
  }
}

export default App;
