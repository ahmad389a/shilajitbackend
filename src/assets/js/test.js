document.querySelectorAll("input[name='layout'").forEach(function (input) {
    input.addEventListener("change", function (e) {
      if (e && e.target && e.target.value == "vertical") {
        updateRadio("layout-vertical");
        document.body.setAttribute("data-layout", "vertical");
        document.body.setAttribute("data-sidebar", "dark");
        document.body.setAttribute("data-topbar", "light");
        document.getElementById("sidebar-setting").style.display = "block";
        document.getElementsByClassName("isvertical-topbar")[0].style.display = "block";
        document.getElementsByClassName("ishorizontal-topbar")[0].style.display = "none";
        document.getElementsByClassName("vertical-menu")[0].style.display = "block";
        if (window.innerWidth <= 992) {
          document.getElementsByClassName("vertical-menu")[0].removeAttribute('style');
        }
        updateRadio("sidebar-color-dark");
        updateRadio("topbar-color-light");
      }        
      else {
        updateRadio("layout-horizontal");
        document.body.setAttribute("data-layout", "horizontal");
        document.body.removeAttribute("data-sidebar");
        document.body.setAttribute("data-topbar", "dark");
        document.getElementById("sidebar-setting").style.display = "none";
        document.getElementsByClassName("vertical-menu")[0].style.display = "none";
        document.getElementsByClassName("ishorizontal-topbar")[0].style.display = "block";
      }
    });
  });

  document.querySelectorAll("input[name='layout']").forEach(function (input){
    input.addEventListener("change", function (e){
        if (e && e.target && e.target.value == "horizontal"){
            updateRadio("layout-horizontal");
            document.body.setAttribute("data-layout", "horizontal");
            document.body.removeAttribute("data-sidebar");
            document.body.setAttribute("data-topbar", "dark");
            document.getElementById("sidebar-setting").style.display = "none";
            document.getElementsByClassName("vertical-menu")[0].style.display = "none";
            document.getElementsByClassName("ishorizontal-topbar")[0].style.display = "block";
            if (window.innerWidth <= 992){
                document.getElementsByClassName ("horizontal-menu")[0].removeAttribute('style');
            }
            updateRadio("sidebar-color-dark");
            updateRadio("topbar-color-light");
          }        
          else{

            updateRadio("layout-vertical");
            document.body.setAttribute("data-layout", "vertical");
            document.body.setAttribute("data-sidebar", "dark");
            document.body.setAttribute("data-topbar", "light");
            document.getElementById("sidebar-setting").style.display = "block";
            document.getElementsByClassName("isvertical-topbar")[0].style.display = "block";
            document.getElementsByClassName("ishorizontal-topbar")[0].style.display = "none";
            document.getElementsByClassName("vertical-menu")[0].style.display = "block";

          }

    });

  });