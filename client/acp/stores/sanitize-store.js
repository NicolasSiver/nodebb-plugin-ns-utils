import alt from '../alt';
import Actions from '../actions';
import SocketEvent from '../models/socket-event';
import SocketService from '../service/socket-service';

let App = app; //Global app

class SanitizeStore {
    constructor() {
        this.bindListeners({
            startSanitize: Actions.startSanitize
        });

        this.state = {
            processing: false,
            stats     : null
        };

        this.subscribe();
    }

    startSanitize(options) {
        SocketService
            .startSanitize(options)
            .then((result) => {
                this.setState({
                    processing: result.status
                })
            });
    }

    subscribe() {
    }
}

export default alt.createStore(SanitizeStore, 'SanitizeStore');
