function search() {
  var q = $(this).val();
  var $results = $('#mono-container');
  var url = "http://gdata.youtube.com/feeds/api/videos/?v=2&alt=jsonc&callback=?"
  url = url + '&max-results=50';

  $.getJSON(url + "&q=" + q, function (json) {
    var count = 0;
    if (json.data.items) {
      var items = json.data.items;
      var html = "";
      items.forEach(function (item) {
        html += '<p><a href="http://youtu.be/' + item.id + '">';
        html += '<img src="http://i.ytimg.com/vi/' + item.id + '/default.jpg">';
        html += '<h2>' + item.title + ' ' + item.duration + '</h2></a></p>';
        count++;
      });
    }

    if (count === 0) {
      $results.html("No videos found");
    } else {
      $results.html(html);
    }
  });
}

$(document).ready(function () {
  $('#youtube-url').on('keyup', $.debounce(450, search) );
});