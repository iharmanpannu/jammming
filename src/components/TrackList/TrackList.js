import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {

	render() {
		return (
			<div className="TrackList">
    			{

    				this.props.tracks.map( track => {
    					return <Track track={track} 
    								  key={track.id}
                                      uri={track.uri} 
    								  onAdd={this.props.onAdd} 
    								  onRemove={this.props.onRemove}
    								  isRemovel={this.props.isRemovel}/>
    				})
    			}
			</div>
			);
	}
}

export default TrackList; 