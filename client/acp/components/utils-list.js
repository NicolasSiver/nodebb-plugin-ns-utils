import React from 'react';

export default class UtilsList extends React.Component {
    constructor(props) {
        super(props);
    }

    listItems() {
        return this.props.utils.map((util, index) => {
            return (
                <li key={index}>{util.name}</li>
            );
        });
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><i className="fa fa-bug"></i> Utils</div>
                <div className="panel-body">
                    <ul>
                        {this.listItems()}
                    </ul>
                </div>
            </div>
        );
    }
}