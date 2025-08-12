// Ensure jQuery is loaded in <head> before this file
$(document).ready(function () {

  /* ------------------------
     Banner carousel (if present)
     ------------------------ */
  if ($(".banner-carousel img").length) {
    let currentIndex = 0;
    let images = $(".banner-carousel img");
    let imageCount = images.length;

    function showNextImage() {
      images.eq(currentIndex).fadeOut(800);
      currentIndex = (currentIndex + 1) % imageCount;
      images.eq(currentIndex).fadeIn(800);
    }
    images.hide();
    images.eq(currentIndex).show();
    setInterval(showNextImage, 3500);
  }

  /* ------------------------
     Scroll-triggered animation
     Adds class 'in-view' when element is visible
     ------------------------ */
  function checkInView() {
    $('.animate-on-scroll').each(function () {
      var $el = $(this);
      var elTop = $el.offset().top;
      var elBottom = elTop + $el.outerHeight();
      var viewTop = $(window).scrollTop();
      var viewBottom = viewTop + $(window).height();

      // when at least 20px of the element is in view
      if (viewBottom > elTop + 20) {
        $el.addClass('in-view');
      }
    });
  }
  $(window).on('load scroll resize', checkInView);
  checkInView();

  /* ------------------------
     Simple Cart with localStorage
     ------------------------ */
  function getCart() {
    return JSON.parse(localStorage.getItem('hanaCart') || '[]');
  }
  function saveCart(cart) {
    localStorage.setItem('hanaCart', JSON.stringify(cart));
  }
  function updateCartCount() {
    var cart = getCart();
    var totalQty = cart.reduce(function(sum, item){ return sum + item.qty; }, 0);
    // if you have an element with id 'cart-count', update it
    $('#cart-count').text(totalQty);
  }

  function showToast(msg) {
    var $t = $('<div class="toast"></div>').text(msg).appendTo('body');
    $t.fadeIn(200).delay(1400).fadeOut(400, function(){ $(this).remove(); });
  }

  $('.add-to-cart').on('click', function (e) {
    e.preventDefault();
    var id = $(this).data('id');
    var name = $(this).data('name');
    var price = parseFloat($(this).data('price')) || 0;

    var cart = getCart();
    var existing = cart.find(function(i){ return i.id === id; });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: id, name: name, price: price, qty: 1 });
    }
    saveCart(cart);
    updateCartCount();
    showToast(name + " added to cart");
  });

  // update cart count on load
  updateCartCount();
});
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  const formatted = now.toLocaleDateString(undefined, options);
  document.getElementById('date-time-display').textContent = formatted;
}

setInterval(updateDateTime, 1000);
updateDateTime();  // initial call to avoid delay
