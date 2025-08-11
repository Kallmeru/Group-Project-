/* ------------------------
   Contact Form Submission
   ------------------------ */
$(document).ready(function() {
  var $form = $('#contact-form');
  var $status = $('#form-status');
  var $button = $form.find('button[type="submit"]');

  $form.on('submit', function(e) {
    e.preventDefault();

    var name = $('#name').val().trim();
    var email = $('#email').val().trim();
    var message = $('#message').val().trim();

    // Basic email format validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === '' || email === '' || message === '') {
      $status.text('Please fill in all fields.').css('color', '#e94e77').attr('aria-live', 'polite');
      return;
    }
    if (!emailPattern.test(email)) {
      $status.text('Please enter a valid email address.').css('color', '#e94e77').attr('aria-live', 'polite');
      return;
    }

    $status.text('Sending...').css('color', '#555').attr('aria-live', 'polite');
    $button.prop('disabled', true);

    setTimeout(function() {
      $status.text('Message sent successfully!').css('color', '#4CAF50').attr('aria-live', 'polite');
      $form.trigger('reset');
      $button.prop('disabled', false);
    }, 2000);
  });
});