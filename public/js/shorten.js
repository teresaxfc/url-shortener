$(document).ready(() => {
  $('#shorten-button').on('click', () => {
    const inputUrl = $('#url-field').val();

    if (inputUrl.indexOf('localhost') < 0) {
      $.ajax({
        url: '/api/shorten',
        type: 'POST',
        dataType: 'JSON',
        data: { originalUrl: inputUrl },
        success(data) {
          const shortenedUrl = `${data.shortenedUrl}`;
          $('#url-field').val(shortenedUrl);
        },
        error() {
          const errorMessage = 'An error occurred shortening that link.';
          $('#url-field').attr("placeholder", errorMessage);
        },
      });
    }

    $('#url-field').val(inputUrl);
  });
});

