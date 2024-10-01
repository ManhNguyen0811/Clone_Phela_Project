window.addEventListener('scroll', function() {
  var div = document.querySelector('.menuProduct');
  var threshold = 1500; // Đoạn cuộn xuống nhất định để cố định div
  var removeThreshold = 6200; // Đoạn cuộn xuống để loại bỏ lớp fixed

  if (window.pageYOffset > threshold && window.pageYOffset < removeThreshold) {
    div.classList.add('fixed');
  } else {
    div.classList.remove('fixed');
  }
});