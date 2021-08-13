import React,{Component} from 'react';

class A extends Component{
    state={
        msg:0
    }

    refaaa=React.createRef();

    handleClick=()=>{
        // this.setState({
        //     msg:this.state.msg+1
        // });
        // console.log('msg',this.state.msg)
        // console.log('onClick')
    }

    render(){
        return(
            <div>
                <h1 ref={this.refaaa} onClick={this.handleClick}>{this.state.msg}</h1>
            </div>
        )
    }

    componentDidMount(){
        console.log(this.refaaa)
        this.refaaa.current.onclick=()=>{
            // console.log('onclick')
            this.setState({
                msg:this.state.msg+1
            });
            console.log('msg',this.state.msg)

        }
    }
}

export default A;