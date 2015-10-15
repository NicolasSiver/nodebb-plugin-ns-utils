import Actions from '../../actions';
import ChatsStore from '../../stores/chats-store';
import classNames from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import React from 'react';
import Stats from '../stats';

class PurgeChats extends React.Component {
    static getStores() {
        return [ChatsStore];
    }

    static getPropsFromStores() {
        return ChatsStore.getState();
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Actions.getChatsStats();
    }

    render() {
        let purgeIcon = classNames(
            'fa',
            {
                'fa-eraser'        : !this.props.purgeProcess,
                'fa-circle-o-notch': this.props.purgeProcess,
                'fa-spin'          : this.props.purgeProcess
            });

        return (
            <div className="util-purge-chats">
                <Stats
                    names={{messagesCount: 'Messages', chatsCount: 'Chats', metaCount: 'Messages Meta'}}
                    data={this.props.stats}/>

                <button
                    className="btn btn-danger"
                    onClick={this.startPurge.bind(this)}
                    disabled={this.props.purgeProcess ? 'disabled' : ''}
                    type="button"><i className={purgeIcon}></i> Purge
                </button>
            </div>
        );
    }

    startPurge(e) {
        Actions.startChatsPurge();
    }
}

export default connectToStores(PurgeChats);