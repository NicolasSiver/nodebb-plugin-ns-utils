import alt from '../alt';
import Actions from '../actions';
import * as SocketEvent from '../models/socket-event';
import SocketService from '../service/socket-service';

let App = app; //Global app

class ChatsStore {
    constructor() {
        this.bindListeners({
            getChatsStats  : Actions.getChatsStats,
            startChatsPurge: Actions.startChatsPurge
        });

        this.state = {
            stats       : null,
            purgeProcess: false
        };

        this.subscribe();
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
            .startChatsPurge()
            .then((response) => {
                App.alertSuccess(response.message);
            });
    }

    subscribe() {
        SocketService
            .subscribe(SocketEvent.CHATS_WILL_PURGE, ()=> {
                this.setState({
                    purgeProcess: true
                });
            });

        SocketService
            .subscribe(SocketEvent.CHATS_DID_PURGE, () => {
                this.setState({
                    purgeProcess: false
                });

                // Refresh stats after purge
                this.getChatsStats();
            });
    }
}

export default alt.createStore(ChatsStore, 'ChatsStore');
