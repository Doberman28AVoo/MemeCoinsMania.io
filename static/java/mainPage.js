  // window.addEventListener('scroll', () => {
  //   const scrollY = window.scrollY;
  //   const parallaxSpeed = 0.3;
  //   const zoomSpeed = 0.0008;

  //   const offsetY = scrollY * parallaxSpeed;
  //   const zoom = 1 + scrollY * zoomSpeed;

  //   document.getElementById('parallax-bg').style.transform =
  //     `translateY(${offsetY}px) scale(${zoom})`;
  // });

//   window.addEventListener('scroll', () => {
//   const scrollY = window.scrollY;
//   const parallax = document.getElementById('parallax-bg');
//   parallax.style.transform = `translateY(${scrollY * 0.3}px)`;
// });

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const parallax = document.getElementById('parallax-bg');
  parallax.style.transform = `translateY(${-scrollY * 0.3}px)`;
});



