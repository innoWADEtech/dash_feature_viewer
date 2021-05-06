import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FeatureViewer from 'feature-viewer';
import 'feature-viewer/css/style.css'
// import 'feature-viewer/examples/index.css'
/**
 * Feature Viewer for Protein or DNA sequences
 * From Calipho 
 * Add Features as object
 * Selected Feature or Sequence available in callback
 * 
 */
export default class DashFeatureViewer extends Component {

    // Clear container
    static clearViewer(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        return parent
    }
    constructor(props) {
        super(props); 
        // bind mouse override functions
        this.cntrl = this.cntrl.bind(this);
        this.cntrl2 = this.cntrl2.bind(this);
        this.cntrl3 = this.cntrl3.bind(this);
        this.createViewer = this.createViewer.bind(this);
        DashFeatureViewer.selectedID = '';
    }
    // main render
    render() {
        const { id, setProps, viewerStyle, zoom, sequence } = this.props;
        const style = { ... viewerStyle }
        return (
            <div id={ id } style={ style }
                 ref={ (c) => { this.container = c; } }
                 />
        );
    }

    componentDidMount() {
        this.createViewer();
        this.container.addEventListener('mousedown', this.cntrl.bind(null, this.container), true);
        this.container.addEventListener('mousemove', this.cntrl2, true);
        this.container.addEventListener('mouseup', this.cntrl3, true);
        
        // console.log(zoom)

    }

    componentDidUpdate(prevProps) {
        const {options, sequence, features, zoom, selectedSeq} = this.props;
        // Have to replace everything on update since no update methods in library
        if (options !== prevProps.options ||
            sequence !== prevProps.sequence ||
            features !== prevProps.features)
            {
                // must clear container or just adds new instances
                this.container = DashFeatureViewer.clearViewer(this.container)
                this.viewer = null;
                this.createViewer();
                console.log('selectedSeq',selectedSeq)
                console.log(DashFeatureViewer.selectedID)
                // if (DashFeatureViewer.selectedID !=null && DashFeatureViewer.selectedID !='') {
                //     this.viewer.addRectSelection(`#f${DashFeatureViewer.selectedID}`)
                // }
                // if (zoom === []) {
                //     this.viewer.zoom(0, sequence.length)
                //     // setProps({zoom: [0, sequence.length] });
                // } else {
                //     this.viewer.zoom(zoom[0]+2,zoom[1]-1)
                // }
            }
        // console.log(this.viewer.sequence)
        // change zoom
        if (zoom !== prevProps.zoom) {
            console.log(prevProps.zoom);
            // console.log(zoom);
            this.viewer.zoom(zoom[0]+2,zoom[1]-1)
            if (DashFeatureViewer.selectedID !=null && DashFeatureViewer.selectedID !='') {
                this.viewer.addRectSelection(`#f${DashFeatureViewer.selectedID}`)
            }
        }
        // if(selectedSeq !== prevProps.selectedSeq) {
        //     this.selectedID = selectedSeq.id
        // }
        // darkmode check
        const seq = document.getElementsByClassName('AA');
        const tick = document.getElementsByClassName('tick');
        // console.log(seq);
        // if (darkMode == true) {
        //     for (let item of seq) {
        //         item.style.fill = 'white';
        //     }
        //     for (let item of tick) {
        //         item.style.fill = 'white';
        //     }
        //     document.getElementById('zoomPosition').style.color = 'white';
        // } else {
        //     for (let item of seq) {
        //         item.style.fill = 'black';
        //     }
        //     for (let item of tick) {
        //         item.style.fill = 'black';
        //     }
        //     document.getElementById('zoomPosition').style.color = 'black';
        // }
        
        
    }
    // main viewer creation
    createViewer() {
        const { id, options, sequence, features, setProps, selectedSeq, zoom } = this.props;
        // unpack all options
        const fullOptions = { ... defaultOptions, ... options }
        // 
        this.viewer = new FeatureViewer(sequence, `#${id}`, fullOptions);
        // this.viewer = viewer
        if (features !== null) {
            features.forEach(feature => {
                this.viewer.addFeature(feature)
            })
        }
        console.log(zoom, sequence, options.zoomMax)
        if (zoom.length === 0 && sequence.length !== 0) {
            // console.log('change me')
            // console.log(sequence)
            // console.log(this.props.sequence)
            // this.viewer.zoom(0, sequence.length)
            setProps({zoom: [0, sequence.length] });
        
        } else if (sequence.length > 0) {
            let zoomMax = 50;
            if (options.zoomMax) {
                zoomMax = options.zoomMax
            }
            if ((zoom[1]-zoom[0]) < zoomMax || (zoom[1]-zoom[0]) > sequence.length) {
                // console.log('reset')
                setProps({zoom: [0, sequence.length] });
            } else {
            this.viewer.zoom(zoom[0]+2,zoom[1]-1)
            }
        }

        console.log(DashFeatureViewer.selectedID)
        if (DashFeatureViewer.selectedID !=null && DashFeatureViewer.selectedID !='') {
                this.viewer.addRectSelection(`#f${DashFeatureViewer.selectedID}`)
        }
        // console.log(this.selectedID);
        // console.log('selectedSeq',selectedSeq)
        // console.log(DashFeatureViewer.selectedID)
        // if (DashFeatureViewer.selectedID !=null && DashFeatureViewer.selectedID !='') {
        //     this.viewer.addRectSelection(DashFeatureViewer.selectedID)
        // }
        
        // set zoom to sequence length
        // console.log(zoom);
        // if (!zoom) {
        //     this.viewer.zoom(0, sequence.length)
        //     // setProps({zoom: [0, sequence.length] });
        // } else {
        //     this.viewer.zoom(zoom[0]+2,zoom[1]-1)
        // }
        // update props with feature boundaries
        this.viewer.onFeatureSelected(function (d) {
            console.log(d);
            console.log(d.detail);
            let did = d.detail.id
            DashFeatureViewer.selectedID = did;
            setProps({ selectedSeq: [d.detail.start-1, d.detail.end] });
        });

        // update props with zoom
        this.viewer.onZoom(function (d) {
            // console.log(d.detail);
            setProps({ zoom: [d.detail.start-1, d.detail.end] });
        }) 
        // console.log(zoom);
    }

    // mouse down with cntrl to start sequence select
    cntrl(container, e) {if (e.ctrlKey === true) {
        e.stopPropagation();
        let selector = '';
        // console.log(document.getElementsByClassName('background')[0].height.baseVal.value)
        // use selectedRect from feature
        if (document.getElementsByClassName('selectedRect')[0]) {
            selector = document.getElementsByClassName('selectedRect')[0];
            selector.style.backgroundColor = "lightgrey";
            selector.style.left = `${e.layerX}px`;
            selector.style.width = '0px';
        // create new selectedRect
        } else {
            selector = document.createElement('div');
            let att = document.createAttribute("class");
            att.value = 'selectedRect'; 
            selector.setAttributeNode(att);
            // let totalHeight = container.clientHeight;
            let figureHeight = document.getElementsByClassName('background')[0].height.baseVal.value
            // let figureHeight = document.getElementsByTagName('svg')[1].clientHeight;
            // let figureHeight = document.getElementsByClassName('background')[0].clientHeight;
            // console.log(document.getElementsByTagName('svg'))
            //console.log(document.getElementsByClassName('background'))
            // selector.style.top = `${totalHeight-figureHeight+7}px`;
            selector.style.top = '60px';
            if (this.props.options.toolbar === false) {
                selector.style.top = '10px';
            }
            selector.style.height = `${figureHeight}px`;
            selector.style.position = 'absolute';
            selector.style.zIndex = -1;
            selector.style.backgroundColor = "lightgrey";
            selector.style.left = `${e.layerX}px`;
            container.appendChild(selector);
        }
        }
    };

    // mousemove with cntrl to select
    cntrl2(e) {if (e.ctrlKey == true) {
        e.stopPropagation();
        if (document.getElementsByClassName('selectedRect')) {
            let selector = document.getElementsByClassName('selectedRect');
            let width = parseFloat(e.layerX) - parseFloat(selector[0].style.left);
            selector[0].style.width = `${width}px`;
            }
        }
    }

    // mouseup with cntrl to end select and update props
    cntrl3 (e) {if (e.ctrlKey == true) {
        // console.log(this.props.zoom)
        e.stopPropagation();
        if (document.getElementsByClassName('selectedRect')) {
            let selector = document.getElementsByClassName('selectedRect')[0];
            let figureWidth = document.getElementsByClassName('background')[0].width.baseVal.value;
            let width = 115;
            let ratio = (this.props.zoom[1]-this.props.zoom[0])/figureWidth;
            let start = parseFloat(selector.style.left.slice(0,-2));
            let end = parseFloat(selector.style.width.slice(0,-2));
            // console.log(e)
            // console.log(start,end,figureWidth)
            let startAA = Math.round((start - width) * ratio) + this.props.zoom[0];
            let endAA = Math.round((start + end - width) * ratio) + this.props.zoom[0];
            this.props.setProps({ selectedSeq: [startAA, endAA]});
        }  
    } else { console.log(document.getElementsByClassName('selectedRect'));
            this.props.setProps({ selectedSeq: [0,0] }); 
            DashFeatureViewer.selectedID = '';
    } 
    }
}

const defaultOptions = {
    showAxis: true,
    showSequence: true,
    brushActive: true, //zoom
    toolbar: true, //current zoom & mouse position
    bubbleHelp: true, 
    zoomMax: 50 ,
};

DashFeatureViewer.defaultProps = {
    options: defaultOptions,
    viewerStyle: {'width': '800px'},
    selectedSeq: [0,0],
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
     * The Zoom of Viewer.
     */
    zoom: PropTypes.array,

    /**
     * The selected sequence of Viewer.
     */
    selectedSeq: PropTypes.array,

    /**
     * The selected sequence of Viewer.
     */
    // darkMode: PropTypes.bool,
};
