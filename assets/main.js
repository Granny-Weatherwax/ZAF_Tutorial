$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '120px' });
  //Get the requester ID from the ticket
  client.get('ticket.requester.id').then(
  function(data) {
    var user_id = data['ticket.requester.id'];
    requestUserInfo(client, user_id);
  });
});

//Define function to request json user data
function requestUserInfo(client, id) {
  var settings = {
    url: '/api/v2/users/' + id + '.json', //using short url for Zendesk data
    type:'GET',
    dataType: 'json',
  };

  client.request(settings).then(
    function(data) {
      showInfo(data);
    },
    function(response) {
      showError(response);
    }
  );
}

//Define showInfo context for the table to pass to the Handlebars template in iframe.html
function showInfo(data) {
  var requester_data = {
    'name': data.user.name,
    'tags': data.user.tags,
    'created_at': formatDate(data.user.created_at),
    'last_login_at': formatDate(data.user.last_login_at)
  };
//Render html & pass data to the template in iframe.
  var source = $("#requester-template").html();
  var template = Handlebars.compile(source);
  var html = template(requester_data);
  $("#content").html(html);
}
//Define showError to form error messages
function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };
//Render and pass errors to the iframe error template
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);
  var html = template(error_data);
  $("#content").html(html);
}
//Define date formatting
function formatDate(date) {
  var cdate = new Date(date);
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  date = cdate.toLocaleDateString("en-us", options);
  return date;
}
