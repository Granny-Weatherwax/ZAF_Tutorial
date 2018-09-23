$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '120px' });
  showInfo();
  //showError();
});

//Define showInfo context for the table to pass to the Handlebars template in iframe.html
function showInfo() {
  var requester_data = {
    'name': 'Jane Doe',
    'tags': ['tag1', 'tag2'],
    'created_at': 'November 20, 2014',
    'last_login_at': 'June 27, 2016'
  };
//Render html & pass data to the template in iframe.
  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}
//Define showError to form error messages
function showError() {
  var error_data = {
    'status': 404,
    'statusText': 'Not found'
  };
//Render and pass errors to the iframe error template
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}
