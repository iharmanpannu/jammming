import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchList from '../SearchList/SearchList';
import PlayList from '../PlayList/PlayList';
import {Spotify} from '../../util/Spotify';


class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchResults: [],
			playlistTracks: [],
			playlistName: 'New PlayList'
		};
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
	}

	addTrack(track){
		let isNew = 1;
		let trackArr = this.state.playlistTracks;
		trackArr.forEach(trackIn => {
			trackIn.id === track.id ?  isNew = 0 : isNew = 1;
		});

		if(isNew) {
			trackArr.push(track);
			this.setState({playlistTracks: trackArr});
		}
	}

	removeTrack(track){
		let trackArr = this.state.playlistTracks;
		trackArr.forEach((trackIn, n) => {
			if(trackIn.id === track.id){  
				trackArr.splice(n, 1);
			}
		});
		this.setState({playlistTracks: trackArr});
	}

	updatePlaylistName(name){
		this.setState({playlistName: name});
	}

	savePlaylist(){
		let trackURIs = [];
		this.state.playlistTracks.forEach(track => {
			trackURIs.push(track.uri);
		});
		Spotify.savePlaylist(this.state.playlistName, trackURIs);
		this.setState({
			searchResults: [],
			playlistTracks: [],
			playlistName: 'New Playlist'
		});
	}

	search(term){
		Spotify.search(term).then(tracksArr => {
			this.setState({searchResults: tracksArr});
		})
		
	}

   	render(){
	    return (
	      <div>
	      	  <h1>Ja<span className="highlight">mmm</span>ing</h1>		
			  <div className="App">
				    <SearchBar onSearch={this.search}/>		  
				    <div className="App-playlist">
				  		<SearchList searchResults={this.state.searchResults} 
				  					onAdd={this.addTrack}/>
				  		<PlayList  playlistTracks={this.state.playlistTracks} 
				  				   playlistName={this.state.playlistName} 
				  				   onRemove={this.removeTrack} 
				  				   onNameChange={this.updatePlaylistName}
				  				   onSave={this.savePlaylist}/>
				  </div>
			  </div>
		  </div>
	    );
	  }
}

export default App;
