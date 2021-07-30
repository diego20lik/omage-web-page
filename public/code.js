function downloadWhitePaper() {
  $.ajax({
    url: "/download_white_paper",
    method: "GET",
    xhrFields: {
      responseType: "blob",
    },
    success: function (data) {
      var a = document.createElement("a");
      var url = window.URL.createObjectURL(data);
      a.href = url;
      a.download = "OmageWhitepaper.pdf";
      document.body.append(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    },
  });
}
$(function () {
  var second = document.querySelector(".box .percent svg circle:nth-child(2)");
  var strokeOffset = 440 - (440 * 65) / 100;
  second.style.strokeDashoffset = strokeOffset;
  $("body").get(0).style.setProperty("--circle", strokeOffset);
  $("#clock")
    .countdown("2021/12/10")
    .on("update.countdown", function (event) {
      var $this = $(this).html(
        event.strftime(
          "" +
            '<span class="h3 font-weight-bold">%D</span> Day%!d' +
            '<span class="h3 font-weight-bold">%H</span> Hr' +
            '<span class="h3 font-weight-bold">%M</span> Min' +
            '<span class="h3 font-weight-bold">%S</span> Sec'
        )
      );
    });
  $(".toggle").click(function () {
    $(".toggle").toggleClass("active");
    $("ul").toggleClass("active");
  });
});
function cerrar(x) {
  if (x != 1) {
    $(".overlay").css("visibility", "hidden");
    setTimeout(() => {
      if (getCookie("accepted") == "") {
        $("#overlay").css("visibility", "visible");
      }
    }, 5000);
  } else {
    $(".overlay").css("visibility", "hidden");
    document.cookie = "accepted=true";
  }
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function checkElementLocation() {
  var bottomWindown = $(window).scrollTop() + $(window).height();
  $(".fade").each(function (i) {
    var $that = $(this);
    var bottomObject = $that.offset().top + 100;
    if (bottomWindown > bottomObject) {
      $(this).addClass("fade-in");
      $(this).removeClass("fade");
    }
  });
  $(".animate").each(function (i) {
    var $that = $(this);
    var bottomObject = $that.offset().top + 100;
    if (bottomWindown > bottomObject) {
      $(this).addClass("animate-circle");
      $(this).removeClass("animate");
    }
  });
}
$(window).on("scroll", function () {
  checkElementLocation();
});
$(document).ready(function () {
  checkElementLocation();
});
