import React from 'react';
import { Button } from 'antd-mobile';
import { Link } from 'react-router-dom';

export default class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: 'Hello World !'
        };
    }

    render() {
        return (
            <div id="Hello">
                <div className="msg">{this.state.msg}</div>
                <ul>
                    <li><Link to="/login">login</Link></li>
                    <li><Link to="/register">register</Link></li>
                </ul>
                <Button>start</Button>
            </div>
        );
    }
}
