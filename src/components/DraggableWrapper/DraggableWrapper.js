import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { DraggableItem } from '../../components';

class DraggableWrapper extends React.Component {
    shouldDragDisabled(draggableId) {
        return ((draggableId === "timeline_add")
            || (draggableId.split("_")[0] === "target"))
    }
    render(){
		return(
			<Draggable
                draggableId={this.props.draggableId}
                key={this.props.draggableId}
                index={this.props.index}
                isDragDisabled={this.shouldDragDisabled(this.props.draggableId)}>
    			{(provided,snapshot) => (

    				<DraggableItem
                        isDragging={snapshot.isDragging}
                        innerRef={provided.innerRef}
                        provided={provided}
                        renderClonePlaceholder={this.props.renderClonePlaceholder}
                    >
                    {this.props.children}
                    </DraggableItem>
    			)}
			</Draggable>

		);

	}
}

DraggableWrapper.propTypes = {
    renderClonePlaceholder: PropTypes.bool,
    draggableId: PropTypes.string,
    index: PropTypes.number
};

DraggableWrapper.defaultProps = {
    renderClonePlaceholder: false,
}

export default DraggableWrapper;
