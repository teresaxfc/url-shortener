$(document).ready(() => {
  $('#shorten-button').on('click', () => {
    $.ajax({
      url: '/api/shorten',
      type: 'POST',
      dataType: 'JSON',
      data: { originalUrl: $('#original-url').val() },
      success(data) {
        const resultHTML = `<a class="result" href="${data.shortened_url}">${
          data.shortened_url}</a>`;
        $('#shortened-url').html(resultHTML);
        $('#shortened-url').hide().fadeIn('slow');
      },
      error() {
        const errorMessage = '<p class="error-message">An error occurred shortening that link.</p>';
        $('#shortened-url').html(errorMessage);
        $('#shortened-url').hide().fadeIn('slow');
      },
    });
  });
});

