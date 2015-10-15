import Actions from '../../actions';
import Caution from '../caution';
import classNames from 'classnames';
import React from 'react';

export default class Sanitize extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sanitize">
                <Caution
                    title="Sorry"
                    text="Will be added in next update."/>
            </div>
        );
    }
}
