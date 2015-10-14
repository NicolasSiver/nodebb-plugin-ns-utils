import ChatsStore from '../../stores/chats-store';
import connectToStores from 'alt/utils/connectToStores';
import React from 'react';

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

    render() {
        return (
            <div className="util-purge-chats">

            </div>
        );
    }
}

export default connectToStores(PurgeChats);