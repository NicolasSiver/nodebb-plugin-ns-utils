import React from 'react';
import UtilsList from './utils-list';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    getAvailableUtils() {
        return [
            {name: 'Purge Chats', entity: 'purge-chats'}
        ];
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <UtilsList
                        utils={this.getAvailableUtils()}/>
                </div>
                <div className="col-md-9">
                    
                </div>
            </div>
        );
    }
}