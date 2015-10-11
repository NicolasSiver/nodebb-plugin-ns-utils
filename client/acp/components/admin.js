import React from 'react';

export default class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    hi
                </div>
                <div className="col-md-9">
                    world
                </div>
            </div>
        );
    }
}