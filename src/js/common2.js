<<<<<<< HEAD
  var bgBar = document.querySelector(".bg-bar");
  var out1 = document.querySelector(".value1");
  var bgBar2 = document.querySelector(".bg-bar2");
  var out2 = document.querySelector(".value2");
  var bgBar3 = document.querySelector(".bg-bar3");
  var out3 = document.querySelector(".value3");

  var x = 0;

  const a = out1.getBoundingClientRect();
  const b = out2.getBoundingClientRect();
  const c = out3.getBoundingClientRect();

  function showOut(k, out) {
    if (x <= k) {
      out.innerText = x + "%";
      x++;
    } else {
      out.innerText = k + "%";
    }
  }

  function showBar1() {
    showOut(90, out1);
  }

  function showBar2() {
    showOut(70, out2);
  }

   function showBar3() {
    showOut(85, out3);
  }

  function show1() {
      if (window.pageYOffset >= a.top / 1.5) {
        // alert(window.pageYOffset);
        setInterval(showBar1, 100);
        bgBar.style.width = 350 + "px";
      }
  }

  function show2() {
    if (window.pageYOffset >= b.top / 2) {
      setInterval(showBar2, 100);
      bgBar2.style.width = 320 + "px";
    }
  }

  function show3() {
    if (window.pageYOffset >= c.top / 3) {
      setInterval(showBar3, 100);
      bgBar3.style.width = 330 + "px";
    }
  }

  window.addEventListener("scroll", function () {
    show1();
    show2();
    show3();
  })
=======
alert('yra')
>>>>>>> c94bfdfd30e88267daf29f327bccd6031930e1c1
