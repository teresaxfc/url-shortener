$(document).ready(() => {
  $('#copy-button').on('click', () => {
    const url = $('#url-field').val();

    if( url !== undefined) {
      $('#url-field').select();

      setTimeout(function () {
        const copiedUrl = `<p>${url}</p>`;

        document.execCommand('copy');
        $('#url-field').blur();
        $(copiedUrl).appendTo(".copied-url").fadeIn(600).fadeOut(1000);
      },200)
    }
  });
});
