let myModule = (function() {
  window.addEventListener('click', click);

  function click() {
    console.log('click');
  }
})()