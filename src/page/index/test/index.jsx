import React from 'react';
import './index.scss';
import {simpleHoc} from '@/component/hoc';
// import { connect } from 'react-redux';
import { addTodo } from '../actions/todoAction.js';
import {url} from 'env';

// @simpleHoc

class Component1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            a:111
        }
    }
    // onClick(){
    //     let text = this.refs.input;
    //     this.props.dispatch(addTodo({
    //         text: text.value
    //     }))
    // }
    render() {
        return (
            <div>
                <a href="./detail.html">detail.html</a>
                <div onClick={this.props.handleClick}>env: {url}</div>
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

export default simpleHoc(Component1);

// export default connect(
//     state => ({
//         todoList: state.todoList
//     })
// )(Main);