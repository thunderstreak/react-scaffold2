import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: 'Hello World!'
        };
    }
    render() {
        return (
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
                <li><Link to="/entry">entry</Link></li>
                <li><Link to="/Products">Products</Link></li>
                <li><Link to="/higher">higher</Link></li>
                <li><Link to="/renderProp">renderProp</Link></li>
                <li><Link to="/lifecycle">lifecycle</Link></li>
                <li><Link to="/counter">Counter</Link></li>
                <li><Link to="/reduxTest">reduxTest</Link></li>
                <li><Link to="/fetch/1031">Fetch</Link></li>
            </ul>

        );
    }
}
