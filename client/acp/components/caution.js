import React from 'react';

export default class Caution extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let title = this.props.title || 'Caution';
        let text = this.props.text || 'Please provide text via property';

        return (
            <div className="caution">
                <b>{title}: </b><span>{text}</span>
            </div>
        );
    }
}