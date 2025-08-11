$(document).ready(function() {
  $('.filter-btn').click(function() {
    const category = $(this).data('category');

    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (category === 'all') {
      $('.product-card').show();
    } else {
      $('.product-card').hide();
      $(`.product-card[data-category="${category}"]`).show();
    }
  });
});
