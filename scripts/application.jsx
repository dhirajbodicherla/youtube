/** @jsx React.DOM */
var React = require('react');
var VideoRow = require('./VideoRow.jsx');

var App = React.createClass({

  players: [],
  videoType: 1,

  getInitialState: function() {
    return {
      URLs: []
    };
  },

  componentDidMount: function() {
    var _this = this;
    $(this.getDOMNode()).find('input[name="video-switch"]').on('change', function(){
      _this.videoTypeChangeHandler();
    });
  },

  search: function () {
    var q = $(this.refs.youtubeUrlInput.getDOMNode()).val();
    var _this = this;
    var url = "http://gdata.youtube.com/feeds/api/videos/?v=2&alt=jsonc&callback=?"
    url = url + '&max-results=50';

    $.getJSON(url + "&q=" + q, function (json) {
      _this.setState({
        URLs: json.data.items
      });
    });
  },

  videoRowClickHandler: function(videoID){
    this.videoType = $(this.getDOMNode()).find('input[type="radio"]:checked').val();
    this.loadPlayers(videoID);
    // this.startVideoHandler();
    // this.videoTypeChangeHandler();
  },

  videoTypeChangeHandler: function(){
    this.videoType = $(this.getDOMNode()).find('input[type="radio"]:checked').val();
    if(this.players.length > 0){
      console.log(this.players);
      if(this.videoType == "1")
        this.players[1].mute();
      else
        this.players[1].unMute();
    }else{
      this.videoType == 2;
    }
  },

  loadPlayers: function(videoID){
    var videoType2 = (this.videoType == "2") ? 1 : 0;
    if(this.players.length == 0){
      var p1 = new YT.Player('videoContainer2', {
        videoId: videoID,
        playerVars: { 'autoplay': 0, 'controls': 1 },
        events: {
          'onReady': this.onPlayerReady
        }
      });
      var p2 = new YT.Player('videoContainer3', {
        videoId: videoID,
        playerVars: { 'autoplay': 0, 'controls': 1 },
        events: {
          'onReady': this.onPlayerReady
        }
      });
    }else{
      this.players.forEach(function(pl){ pl.loadVideoById(videoID); });
    }
  },

  onPlayerReady: function(e){
    this.players.push(e.target);
    if(this.players.length == 2){
      this.startVideoHandler();
      this.videoTypeChangeHandler();
    }
  },

  startVideoHandler: function(){
    this.players.forEach(function(pl){ pl.playVideo(); });
  },

  pauseVideoHandler: function(){
    this.players.forEach(function(pl){ pl.pauseVideo(); });
  },

  render: function() {
    var urls = this.state.URLs.map(function(url){
      return (
        <VideoRow url={url} key={url.id} onClick={this.videoRowClickHandler}/>
      );
    }, this);
    return (
      <div>
        <input type="text"
              ref="youtubeUrlInput"
              placeholder="Copy Youtube URL"
              onKeyUp={$.debounce(450, this.search)} />
        <input type="radio" name="video-switch" value="1" defaultChecked/> Mono
        <input type="radio" name="video-switch" value="2" /> Stereo
        <input type="button" ref="startVideo" value="Start" onClick={this.startVideoHandler}/>
        <input type="button" ref="pauseVideo" value="Pause" onClick={this.pauseVideoHandler}/>
        <div className="video-urls">
          {urls}
        </div>
        <div className="video-container" id="videoContainer1"></div>
        <div className="video-container" id="videoContainer2"></div>
        <div className="video-container" id="videoContainer3"></div>
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById("main")
);