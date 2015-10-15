import Actions from '../../actions';
import ChatsStore from '../../stores/chats-store';
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
        return (
            <div className="util-purge-chats">
                <Stats
                    names={{messagesCount: 'Messages', chatsCount: 'Chats'}}
                    data={this.props.stats}/>
            </div>
        );
    }
}

export default connectToStores(PurgeChats);