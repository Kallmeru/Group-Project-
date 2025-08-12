$(document).ready(function() {
  // FILTER FUNCTIONALITY
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

  // ADD TO CART FUNCTIONALITY
  $('.add-to-cart').click(function() {
    const name = $(this).data('name');
    const price = parseFloat($(this).data('price'));

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${name} has been added to your cart!`);
  });
});
