$(document).ready(() => {
  $('#shorten-button').on('click', () => {
    const inputUrl = $('#original-url').val();

    if (inputUrl.indexOf('localhost') < 0) {
      $.ajax({
        url: '/api/shorten',
        type: 'POST',
        dataType: 'JSON',
        data: { originalUrl: inputUrl },
        success(data) {
          const shortenedUrl = `${data.shortenedUrl}`;
          $('#original-url').val(shortenedUrl);
        },
        error() {
          const errorMessage = 'An error occurred shortening that link.';
          $('#original-url').val(errorMessage);
        },
      });
    }

    $('#original-url').val(inputUrl);
  });
});

