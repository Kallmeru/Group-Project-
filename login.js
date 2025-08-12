/* ------------------------
   Login Form Submission
   ------------------------ */
$(document).ready(function() {
  var $form = $('#login-form');
  var $status = $('#login-status');
  var $button = $form.find('button[type="submit"]');

  $form.on('submit', function(e) {
    e.preventDefault();

    var email = $('#email').val().trim();
    var password = $('#password').val().trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '' || password === '') {
      $status.text('Please enter both email and password.').css('color', '#e94e77');
      return;
    }
    if (!emailPattern.test(email)) {
      $status.text('Please enter a valid email address.').css('color', '#e94e77');
      return;
    }

    $status.text('Logging in...').css('color', '#555');
    $button.prop('disabled', true);

    setTimeout(function() {
      document.cookie = "userEmail=" + encodeURIComponent(email) + "; path=/; max-age=86400";
      $status.text('Login successful! Redirecting...').css('color', '#4CAF50');
      alert('Login successful!');
      $form.trigger('reset');
      $button.prop('disabled', false);
      // Optionally, redirect after a short delay:
      // setTimeout(function() { window.location.href = 'dashboard.html'; }, 1500);
    }, 2000);
  });

  // Clear status when user types
  $('#email, #password').on('input', function() {
    $status.text('');
  });

  // Show/Hide password feature
  $('#togglePassword').on('click', function() {
    var $passwordInput = $('#password');
    var type = $passwordInput.attr('type') === 'password' ? 'text' : 'password';
    $passwordInput.attr('type', type);
    $(this).text(type === 'password' ? 'Show' : 'Hide');
  });
});