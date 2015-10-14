import alt from '../alt';
import Actions from '../actions';
import SocketService from '../service/socket-service';

class CapabilitiesStore {
    constructor() {
        this.bindListeners({
            getDatabaseName: Actions.getDatabaseName
        });

        this.state = {
            database: null
        };
    }

    getDatabaseName() {
        SocketService
            .getDatabaseName()
            .then((name) => {
                this.setState({
                    database: name
                })
            });
    }
}

export default alt.createStore(CapabilitiesStore, 'CapabilitiesStore');
