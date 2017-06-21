$(document).ready(function () {
  $('#shorten-button').on('click', function () {
    $.ajax({
      url: '/api/shorten',
      type: 'POST',
      dataType: 'JSON',
      data: {url: $('#original-url').val()},
      success: function (data) {
        const resultHTML = '<a class="result" href="' + data.shortUrl + '">'
          + data.shortUrl + '</a>';
        $('#shortened-url').html(resultHTML);
        $('#shortened-url').hide().fadeIn('slow');
      }
    });
  });
});

