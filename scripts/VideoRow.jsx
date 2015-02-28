var React = require('react');

var VideoRow = React.createClass({

  clickHandler: function(e){
    this.props.onClick(this.props.url.id);
    e.preventDefault();
  },

  render: function() {
    var url = this.props.url;
    return (
      <div onClick={this.clickHandler}>
        <a href={"http://youtu.be/" + url.id}>
          <img src={"http://i.ytimg.com/vi/" + url.id + "/hqdefault.jpg"}></img>
        </a>
      </div>
    );
  }

});

module.exports = VideoRow;