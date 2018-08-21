import React from 'react';

import Entry from './entry';

export default class Index extends React.Component {
    render() {
        return (
            <div className="Index">
               {this.props.children || <Entry/>}
            </div>
        );
    }
}
