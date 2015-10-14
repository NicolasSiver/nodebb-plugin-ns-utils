import Caution from './caution';
import React from 'react';
import Util from '../models/util';
import ViewPurgeChats from './util/purge-chats';

export default class UtilViewRenderer extends React.Component {
    constructor(props) {
        super(props);
    }

    createUtilView(util) {
        switch (util.utilId) {
            case Util.PURGE_CHATS:
                return (
                    <ViewPurgeChats />
                );
            default:
                return null;
        }
    }

    render() {
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
                    {this.createUtilView(this.props.util)}
                </div>
            </div>
        );
    }
}