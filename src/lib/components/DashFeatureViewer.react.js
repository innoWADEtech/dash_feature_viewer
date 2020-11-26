import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import './feature-viewer.bundle.js';
// import './feature-viewer.min.css';
import FeatureViewer from 'feature-viewer';
/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class DashFeatureViewer extends Component {

    static clearViewer(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        return parent
    }
    constructor(props) {
        super(props);
    }

    render() {
        const { id, setProps, viewerStyle } = this.props;
        const style = { ... viewerStyle }
        return (
            <div id={id} style={style}
                 ref={(c) => { this.container = c; }}
                 />
        );
    }

    componentDidMount() {
        // this.createViewer();
    }

    componentDidUpdate() {
        // this.viewer.clearInstance();
        this.createViewer();
    }

    createViewer() {
        const { id, options, sequence, features, setProps, featureSelected } = this.props;
        // console.log(this.container)
        this.container = DashFeatureViewer.clearViewer(this.container)
        // console.log(this.container)
        const fullOptions = { ... defaultOptions, ... options }
        console.log(fullOptions)
        this.viewer = new FeatureViewer(sequence, `#${id}`, fullOptions);
        // this.viewer = viewer
        if (features !== null) {
            features.forEach(feature => {
                this.viewer.addFeature(feature)
            })
        }
        console.log(this.viewer.extents)
        this.viewer.onFeatureSelected(function (d) {
            console.log(d.detail);
            setProps({ featureSelected: d.detail });
        });
    }
}

const defaultOptions = {
    showAxis: true,
    showSequence: true,
    brushActive: true, //zoom
    toolbar: true, //current zoom & mouse position
    bubbleHelp: true, 
    zoomMax: 50 
};

DashFeatureViewer.defaultProps = {
    options: defaultOptions,
    viewerStyle: {width: '500px'},
};

DashFeatureViewer.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * Options for Feature Viewer.
     */
    options: PropTypes.object,

    /**
     * The Sequence or integer length value.
     */
    sequence: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,

    /**
     * The Features to View.
     */
    features: PropTypes.array,

    /**
     * The Style of Viewer.
     */
    viewerStyle: PropTypes.object,

    /**
     * The Style of Viewer.
     */
    featureSelected: PropTypes.object,
};
