import Actions from '../../actions';
import SanitizeStore from '../../stores/sanitize-store';
import classNames from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import React from 'react';

class Sanitize extends React.Component {
    static getStores() {
        return [SanitizeStore];
    }

    static getPropsFromStores() {
        return SanitizeStore.getState();
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sanitize">

            </div>
        );
    }
}


export default connectToStores(Sanitize);
