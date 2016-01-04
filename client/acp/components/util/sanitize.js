import Actions from '../../actions';
import Caution from '../caution';
import classNames from 'classnames';
import connectToStores from 'alt/utils/connectToStores';
import React from 'react';
import SanitizeStore from '../../stores/sanitize-store';
import Stats from '../stats';

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

    getDashboard() {
        return <Stats
            names={{progress: 'Complete', fieldsPurged: 'Fields', docsParsed: 'Parsed', docsUpdated: 'Updated'}}
            data={this.props.stats}/>;
    }

    getError() {
        if (this.props.keyMatchError) {
            return <Caution
                text={this.props.keyMatchError}/>;
        } else {
            return null;
        }
    }

    getSanitizeInfo() {
        return (
            <div className="alert alert-info" role="alert">
                Processed {this.props.stats.docsParsed} documents, where {this.props.stats.fieldsPurged} fields were deleted. {this.props.stats.docsUpdated} documents were updated.
            </div>
        );
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
                    disabled={!this.props.keyMatch ? 'disabled' : ''}
                    type="button"><i className="fa fa-eraser"></i> Start
                </button>
            </div>
        );
    }

    keyMatchDidChange(e) {
        Actions.updateSanitizeKeyMatch(e.target.value);
    }

    render() {
        console.log(this.props);
        const view = (this.props.processing) ? this.getDashboard() : this.getStartForm();
        const previous = (!this.props.processing && this.props.stats) ? this.getSanitizeInfo() : null;
        return (
            <div className="util-sanitize">
                {previous}
                {this.getError()}
                {view}
            </div>
        );
    }

    start() {
        Actions.startSanitize();
    }
}

export default connectToStores(Sanitize);
