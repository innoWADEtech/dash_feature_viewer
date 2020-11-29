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
        this.seqview = {start: 0, end: this.props.sequence.length, scale: 1};
        this.cntrl = this.cntrl.bind(this);
        this.cntrl3 = this.cntrl3.bind(this);
        this.createViewer = this.createViewer.bind(this);
    }

    render() {
        // this.container = DashFeatureViewer.clearViewer(this.container);
        // this.createViewer();
        const { id, setProps, viewerStyle, zoom, sequence } = this.props;
        const style = { ... viewerStyle }

        return (
            <div id={id} style={style}
                 ref={(c) => { this.container = c; }}
                 />
        );
    }

    componentDidMount() {
        this.createViewer();
        this.container.addEventListener('mousedown', this.cntrl.bind(null, this.container), true);
        this.container.addEventListener('mousemove', this.cntrl2, true);
        this.container.addEventListener('mouseup', this.cntrl3, true);
    }

    componentDidUpdate(prevProps) {
        const {options, sequence, features, zoom } = this.props;
        if (options !== prevProps.options ||
            sequence !== prevProps.sequence ||
            features !== prevProps.features)
            {
                console.log('update')
                this.container = DashFeatureViewer.clearViewer(this.container)
        //         this.viewer.clearInstance()
                this.viewer = null;
                // document.getElementsByTagName('svg').forEach(node =>
        //         // {
        //         //     node.remove()
        //         // })

                this.createViewer();
            }
        // if (zoom !== this.state.zoom) {
        //     this.setState({ zoom: zoom})
        // }
        // console.log(this.state)
        // this.viewer.clearInstance();
        
    }
    createViewer() {
        const { id, options, sequence, features, setProps, featureSelected, zoom } = this.props;
        // console.log(this.container)

        console.log(this.container)
        
        const fullOptions = { ... defaultOptions, ... options }
        // console.log(fullOptions)
        // if (this.viewer) {
        //     this.viewer.clearViewer()
        // }
        this.viewer = new FeatureViewer(sequence, `#${id}`, fullOptions);
        // this.viewer = viewer
        if (features !== null) {
            features.forEach(feature => {
                this.viewer.addFeature(feature)
            })
        }
        console.log(zoom)
        console.log(sequence.length)
        setProps({zoom: [0, sequence.length] });
        // console.log(this.container.clientHeight)
        // console.log(document.getElementById(this.props.id))
        this.viewer.onFeatureSelected(function (d) {
            console.log(d.detail);
            setProps({ featureSelected: d.detail });
        });

        this.seqview.start = 0;
        this.seqview.end = this.props.sequence.length;
        this.seqview.scale = 1;
        // this.viewer.onZoom(this.zoomba.bind(null, setProps)
        this.viewer.onZoom(function (d) {
            console.log(d.detail);
            setProps({ zoom: [d.detail.start, d.detail.end]});
        })
        // console.log(this.container)
        // console.log(this.seqview)
        // console.log(this.state.zoom)
        // document.onkeydown = (e, key) => {key = e.key; console.log(key)}  
    }

    // zommba(setProps, e) {
    //     console.log(d.details)
    // }

    cntrl(container, e) {console.log(e); if (e.ctrlKey === true) {
        console.log(this.props.zoom);
        let figureWidth = document.getElementsByClassName('background')[0].width.baseVal.value;
        let totalWidth = container.clientWidth;
        let width = 115;
        let mousepos = e.x-width;
        let ratio = (this.props.zoom[1]-this.props.zoom[0])/figureWidth;
        let seqpos = parseInt(mousepos * ratio)
        console.log(seqpos+this.props.zoom[0], this.props.sequence[this.props.zoom[0]+seqpos]);
        e.stopPropagation();
        let selector = '';
        if (document.getElementsByClassName('selectedRect')[0]) {
            selector = document.getElementsByClassName('selectedRect')[0];
            selector.style.backgroundColor = "lightgrey";
            selector.style.left = `${e.x}px`;
            selector.style.width = '0px';
        } else {
            selector = document.createElement('div');
            let att = document.createAttribute("class");
            att.value = 'selectedRect'; 
            selector.setAttributeNode(att);
            let totalHeight = container.clientHeight;
            let figureHeight = document.getElementsByTagName('svg')[0].clientHeight;
            console.log(document.getElementsByTagName('svg')[0].clientHeight)
            // selector.style.top = `${totalHeight-figureHeight+7}px`;
            selector.style.top = '60px';
            selector.style.height = `${figureHeight-10}px`;
            selector.style.position = 'absolute';
            selector.style.zIndex = -1;
            selector.style.backgroundColor = "lightgrey";
            selector.style.left = `${e.x}px`;
            container.appendChild(selector);
        }
        }
    };

    cntrl2(e) {if (e.ctrlKey == true) {
        e.stopPropagation();
        if (document.getElementsByClassName('selectedRect')) {
            let selector = document.getElementsByClassName('selectedRect');
            let width = parseFloat(e.x) - parseFloat(selector[0].style.left);
            selector[0].style.width = `${width}px`;
            }
        }
    }

    cntrl3 (e) {if (e.ctrlKey == true) {
        e.stopPropagation();
        console.log('end', e.x);
        if (document.getElementsByClassName('selectedRect')) {
            let selector = document.getElementsByClassName('selectedRect')[0];
            let figureWidth = document.getElementsByClassName('background')[0].width.baseVal.value;
            // let totalWidth = container.clientWidth;
            let width = 115;
            let mousepos = e.x-width;
            let ratio = (this.props.zoom[1]-this.props.zoom[0])/figureWidth;
            console.log(selector.style.left.slice(0,-2), selector.style.width.slice(0,-2))
            let start = parseFloat(selector.style.left.slice(0,-2));
            let end = parseFloat(selector.style.width.slice(0,-2));
            let startAA = parseInt((start - width) * ratio);
            let endAA = parseInt((start + end - width) * ratio);
            this.props.setProps({ selectedSeq: [startAA, endAA]});
            // let seqpos = parseInt(selector.style.left * ratio)
        }  
    } 
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
    zoom: [0,0],
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

    /**
     * The Style of Viewer.
     */
    zoom: PropTypes.array,

    /**
     * The Style of Viewer.
     */
    selectedSeq: PropTypes.array,
};
