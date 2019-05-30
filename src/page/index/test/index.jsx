import React from 'react';
// import { connect } from 'react-redux';
import { addTodo } from '../actions/todoAction.js';
export default class Component1 extends React.Component {
    // onClick(){
    //     let text = this.refs.input;
    //     this.props.dispatch(addTodo({
    //         text: text.value
    //     }))
    // }
    render() {
        return (
            <div>
                <a href="/detail.html">detail.html</a>
                {/* <input ref="input" type="text"></input>
                <button onClick={()=>this.onClick()}>提交</button>
                <ul>
                {this.props.todoList.map((item, index)=>{
                    return <li key={index}>{item.text}</li>
                })}
                </ul> */}
            </div>
        );
    }
}

// export default connect(
//     state => ({
//         todoList: state.todoList
//     })
// )(Main);