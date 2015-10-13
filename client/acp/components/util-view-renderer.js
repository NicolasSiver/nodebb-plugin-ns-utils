import Caution from './caution';
import React from 'react';

export default class UtilViewRenderer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let utilView;

        if (!this.props.util) {
            // Nothing to show
            return null;
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">{this.props.util.name}</div>
                <div className="panel-body">
                    <Caution
                        text="Please, create data backup. Plugin performs irreversible actions: delete documents, change documents in place, etc."/>
                </div>
            </div>
        );
    }
}