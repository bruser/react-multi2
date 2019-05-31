import React, { Component } from 'react';
// 高阶组件
export const simpleHoc = WrappedComponent => {
    return class extends Component {
        constructor(props) {
            super(props)
        }
        componentDidMount() {
            console.log(this.instanceComponent)
        }
        _a = () => {
            console.log(111)
        }
        render() {
            return (
                <div>
                    <div>hoc</div>
                    <WrappedComponent
                        {...this.props}
                        handleClick={this._a}
                        ref={instanceComponent => this.instanceComponent = instanceComponent}
                    />
                </div>

            )

        }
    }
}
// export default simpleHoc;

// class Usual extends Component {
//     render() {
//         console.log(this.props, 'props');
//         return (
//             <div>Usual</div>
//         )
//     }
// }

// export default simpleHoc(Usual);