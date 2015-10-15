import Bluebird from 'bluebird';
import SocketMethod from '../models/socket-method';

let socketEmit = Bluebird.promisify(socket.emit, socket);
let App = app; //Global app

export default class SocketService {
    static getChatsStats() {
        return this.handleGeneralError(
            socketEmit(SocketMethod.GET_CHATS_STATS, {})
        );

    }

    static getDatabaseName() {
        return this.handleGeneralError(
            socketEmit(SocketMethod.GET_DATABASE_NAME, {})
        );
    }

    static handleGeneralError(promise) {
        return promise.catch((error) => {
            App.alertError(error.message);
        });
    }

    static startChatsPurge() {
        return this.handleGeneralError(
            socketEmit(SocketMethod.START_CHATS_PURGE, {})
        );
    }
}
