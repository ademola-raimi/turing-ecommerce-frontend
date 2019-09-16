import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAttributesSize, fetchAttributesColor } from '../actions/Attributes';
import _ from 'lodash';
import { Link } from 'react-router';
import { fetchProducts } from '../actions/Products';
import {RangeSlider} from 'reactrangeslider';
import styles from './slider';
import Loader from 'react-loader-spinner';
 import 'react-rangeslider/lib/index.css'

class Attributes extends Component {

    constructor (props) {
        super(props);
        this.state = {
            ...props,
            activeColorAttributeId: null,
            activeSizeAttributeId: null,
            color: null,
            size: null,
            minPrice: null,
            maxPrice: null,
            value: { start: 0, end: 50 }
        };
    }

    componentDidMount() {
        this.props.actions.fetchAttributesSize();
        this.props.actions.fetchAttributesColor();
    }

    shouldComponentUpdate (nextProps, nextState, nextContent) {
        return true;
    }

    fetchProductColor = (attributeValueId, attributeValue) => {
        this.setState({
            activeColorAttributeId: attributeValueId,
            color: attributeValue
        })
        this.props.actions.fetchProducts(true, "", this.state.size, attributeValue, this.state.minPrice, this.state.maxPrice);
    }

    fetchProductSize = (attributeValueId, attributeValue) => {
        this.setState({
            activeSizeAttributeId: attributeValueId,
            size: attributeValue
        })
        this.props.actions.fetchProducts(true, "", attributeValue, this.state.color, this.state.minPrice, this.state.maxPrice);
    }

    renderColorAttributes = (attribute,index)=>{
        const linkClass = (this.state.activeColorAttributeId === attribute.attribute_value_id) ? "list-group-item active" : "list-group-item"
        return(
            <Link
                to='#'
                className={linkClass}
                onClick={()=>this.fetchProductColor(attribute.attribute_value_id, attribute.value)}
            >
                {attribute.value}
            </Link>
        );
    };

    renderSizeAttributes = (attribute,index)=>{
        const linkClass = (this.state.activeSizeAttributeId === attribute.attribute_value_id) ? "badge badge-red active" : "badge"
        return(
            <Link
                to='#'
                className={linkClass}
                onClick={()=>this.fetchProductSize(attribute.attribute_value_id, attribute.value)}
            >
                {attribute.value}
            </Link>
        );
    };

    handleChange = value => {
      this.setState({ value });
    };

    handleChangeComplete = () => {
        this.props.actions.fetchProducts(true, "", this.state.size, this.state.color, this.state.value.start, this.state.value.end);
    };

    render() {
        const { sizeAttributes, colorAttributes, sizeIsLoading, colorIsLoading } = this.props.AttributesStore;
        return(
            <div className="well">
                <h4>Size</h4>
                {sizeIsLoading ? <Loader type="ThreeDots" className="loader" /> :
                <div className="list-group">
                    <Link
                        to='#'
                        className={_.isNil(this.state.activeSizeAttributeId) ? "badge badge-red active" : "badge"}
                        onClick={()=>this.fetchProductSize(null, null)}
                    >
                        All
                    </Link>
                    {
                        sizeAttributes.map((attribute,index)=>{
                            return this.renderSizeAttributes(attribute,index);
                        })
                    }
                </div>}
                <hr/>
                <h4>Color</h4>
                {colorIsLoading ? <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" /> :
                <div className="list-group">
                    <Link
                        to='#'
                        className={_.isNil(this.state.activeColorAttributeId) ? "list-group-item active" : "list-group-item"}
                        onClick={()=>this.fetchProductColor(null, null)}
                    >
                        All
                    </Link>
                    {
                        colorAttributes.map((attribute,index)=>{
                            return this.renderColorAttributes(attribute,index);
                        })
                    }
                </div>}
                <hr/>
                <h4>Price</h4>
                <div style={styles.sliderWrapper}>
                    <RangeSlider
                      step={ 1 }
                      value={ this.state.value }
                      onChange={ this.handleChange }
                      min={ 0 }
                      max={ 50 }
                      afterChange={this.handleChangeComplete}
                      wrapperClassName={styles.slider}
                      highlightedTrackClassName={styles.sliderHighlightedTrack}
                      trackClassName={styles.sliderTrack}
                      handleClassName={styles.sliderHandle}

                      handleStyle={styles.handleStyle}
                      hoveredHandleStyle={styles.hoveredHandleStyle}
                      focusedHandleStyle={styles.focusedHandleStyle}
                      activeHandleStyle={styles.activeHandleStyle}
                    />
                  <span className="valueText">Min: ${this.state.value.start}</span>
                  <span className="valueText">Max: ${this.state.value.end}</span>
                </div>
            </div>
            
            
        );
    };
};

function mapStateToProps(state) {
    return {
        AttributesStore: state.Attributes,
        ProductsStore: state.Product
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchAttributesSize,
                fetchAttributesColor,
                fetchProducts
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Attributes);