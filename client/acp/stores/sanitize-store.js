import alt from '../alt';
import Actions from '../actions';
import * as SocketEvent from '../models/socket-event';
import SocketService from '../service/socket-service';

let App = app; //Global app

class SanitizeStore {
    constructor() {
        this.bindListeners({
            startSanitize         : Actions.startSanitize,
            updateSanitizeKeyMatch: Actions.updateSanitizeKeyMatch
        });

        this.state = {
            processing   : false,
            keyMatch     : null,
            keyMatchError: null,
            stats        : null
        };

        this.subscribe();
    }

    startSanitize() {
        if (this.validate(this.state.keyMatch)) {
            SocketService
                .startSanitize({match: this.state.keyMatch})
                .then(() => {
                    App.alertSuccess('Sanitize process should start');
                });
        }
    }

    subscribe() {
        SocketService
            .subscribe(
                SocketEvent.SANITIZE_STATUS_DID_CHANGE,
                (result) => {
                    this.setState({
                        processing: result.status
                    });
                });

        SocketService
            .subscribe(
                SocketEvent.SANITIZE_STATS_DID_CHANGE,
                (result) => {
                    this.setState({
                        stats: result.stats
                    });
                });
    }

    updateSanitizeKeyMatch(data) {
        let {match} = data;
        this.setState({
            keyMatch     : match,
            keyMatchError: (!match) ? 'Regular expression is empty' : null
        });
    }

    validate(exp) {
        let valid = false;
        try {
            let reg = new RegExp(exp, 'g');
            valid = true;
        } catch (e) {
            this.setState({
                keyMatchError: e.message
            });
        }

        return valid;
    }
}

export default alt.createStore(SanitizeStore, 'SanitizeStore');
