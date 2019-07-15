import React from 'react';
import PropTypes from 'prop-types';
import './DraggableItem.scss';

class DraggableItem extends React.Component {
	renderPlaceholder(placeholder) {
		return React.cloneElement(placeholder, {
			className: "draggableItem clone-item " + placeholder.props.className
		});
	};
	render(){
		const { provided, innerRef, isDragging, renderClonePlaceholder } = this.props;
		const class_name = isDragging ? "draggableItem isDragging" : "draggableItem";
		return(
			<React.Fragment>
                <div className={class_name}
                	{...provided.draggableProps}
                	{...provided.dragHandleProps}
                	ref={innerRef}
                >
                    { this.props.children }
                </div>
                {renderClonePlaceholder && isDragging && this.renderPlaceholder(this.props.children)}
            </React.Fragment>
		);
	}
}

DraggableItem.propTypes = {
    innerRef: PropTypes.oneOfType([
	    			PropTypes.object,
					PropTypes.func]),
	provided: PropTypes.object,
	isDragging: PropTypes.bool,
    renderClonePlaceholder: PropTypes.bool,
};

DraggableItem.defaultProps = {
    renderClonePlaceholder: false,
	isDragging: false
}

export default DraggableItem
