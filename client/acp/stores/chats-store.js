import alt from '../alt';
import Actions from '../actions';
import SocketService from '../service/socket-service';

class ChatsStore {
    constructor() {
        this.bindListeners({
            getChatsStats  : Actions.getChatsStats,
            startChatsPurge: Actions.startChatsPurge
        });

        this.state = {
            stats: null
        };
    }

    getChatsStats() {
        SocketService
            .getChatsStats()
            .then((chatsStats) => {
                this.setState({
                    stats: chatsStats
                })
            });
    }

    startChatsPurge() {
        SocketService
            .startChatsPurge();
    }
}

export default alt.createStore(ChatsStore, 'ChatsStore');
