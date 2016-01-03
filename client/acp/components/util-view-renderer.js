import Caution from './caution';
import React from 'react';
import Sanitize from './util/sanitize';
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
            case Util.SANITIZE_DOCUMENTS:
                return (
                    <Sanitize />
                );
            default:
                return null;
        }
    }

    isValidDatabase(){
        return this.props.database === 'mongo';
    }

    render() {
        if (!this.props.util) {
            // Nothing to show
            return null;
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">{this.props.util.name}</div>
                <div className="panel-body util-body">
                    <Caution
                        text="Please, create data backup. Plugin performs irreversible actions: deletes documents, changes documents in place, etc."/>
                    {this.getWrongDatabaseViewIfNeeded()}
                    {this.isValidDatabase() ? this.createUtilView(this.props.util) : null}
                </div>
            </div>
        );
    }

    getWrongDatabaseViewIfNeeded() {
        if (!this.isValidDatabase()) {
            return (
                <Caution
                    title="MongoDB"
                    text="Sorry. Plugin supports only operations with MongoDB."/>
            );
        }
    }
}
