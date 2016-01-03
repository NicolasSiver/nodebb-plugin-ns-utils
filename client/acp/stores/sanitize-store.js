import alt from '../alt';
import Actions from '../actions';
import SocketEvent from '../models/socket-event';
import SocketService from '../service/socket-service';

let App = app; //Global app

class SanitizeStore {
    constructor() {
        this.bindListeners({
            startSanitize         : Actions.startSanitize,
            updateSanitizeKeyMatch: Actions.updateSanitizeKeyMatch
        });

        this.state = {
            processing: false,
            keyMatch  : null,
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

    updateSanitizeKeyMatch(data) {
        this.setState({
            keyMatch: data.match
        });
    }
}

export default alt.createStore(SanitizeStore, 'SanitizeStore');
