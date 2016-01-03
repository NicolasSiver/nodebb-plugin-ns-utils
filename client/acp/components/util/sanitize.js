import Actions from '../../actions';
import Caution from '../caution';
import classNames from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import React from 'react';
import SanitizeStore from '../../stores/sanitize-store';

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

    getError() {
        if (this.props.keyMatchError) {
            return <Caution
                text={this.props.keyMatchError}/>;
        } else {
            return null;
        }
    }

    getStartForm() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="exp">Match Expression</label>
                    <input
                        type="text" className="form-control" id="exp" placeholder="Enter regular expression"
                        value={this.props.keyMatch}
                        onChange={this.keyMatchDidChange.bind(this)}/>
                </div>
                <p>
                    <small>Expression applies only to keys. Example, remove all fields after import:
                        <code className="code-sample">_imported_</code></small>
                </p>
                <button
                    className="btn btn-danger"
                    onClick={this.start.bind(this)}
                    type="button"><i className="fa fa-eraser"></i> Start
                </button>
            </div>
        );
    }

    keyMatchDidChange(e) {
        Actions.updateSanitizeKeyMatch(e.target.value);
    }

    render() {
        return (
            <div className="util-sanitize">
                {this.getError()}
                {this.getStartForm()}
            </div>
        );
    }

    start() {
        Actions.startSanitize();
    }
}

export default connectToStores(Sanitize);
