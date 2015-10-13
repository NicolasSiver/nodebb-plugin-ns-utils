import React from 'react';

export default class UtilViewRenderer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let utilView;

        if(!this.props.util){
            // Nothing to show
            return null;
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">{this.props.util.name}</div>
                <div className="panel-body">

                </div>
            </div>
        );
    }
}