$(document).ready(function () {
  $('#shorten-button').on('click', function () {
    $.ajax({
      url: '/api/shorten',
      type: 'POST',
      dataType: 'JSON',
      data: {url: $('#original-url').val()},
      success: function (data) {
        const resultHTML = '<a class="result" href="' + data.shortened_url + '">'
          + data.shortened_url + '</a>';
        $('#shortened-url').html(resultHTML);
        $('#shortened-url').hide().fadeIn('slow');
      },
      error: function () {
        const errorMessage = '<p class="error-message">An error occurred shortening that link.</p>';
        $('#shortened-url').html(errorMessage);
        $('#shortened-url').hide().fadeIn('slow');
      }
    });
  });
});

