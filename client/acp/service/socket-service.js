import Bluebird from 'bluebird';
import * as SocketMethod from '../models/socket-method';

let App = app; //Global app
let socketEmit = Bluebird.promisify(socket.emit, socket);

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

    static startSanitize(options) {
        return this.handleGeneralError(
            socketEmit(SocketMethod.START_SANITIZE, options)
        );
    }

    static subscribe(event, callback) {
        socket.on(event, callback);
    }
}
