function eprez_tag(sysno) {
  sysno = sysno.replace(/^MUB0[1-3]/, "");
  var eprez = document.getElementById("eprez");
  var time = (new Date).getTime();
  var url = "https://kic.ics.muni.cz/eprezencka/alephApi/toAleph.pl?sysno=" + sysno + "&jsoncallback=eprez_tag_callback&_=" + time;
  var xhttp = new XMLHttpRequest();

  function eprez_tag_callback() {
    data = {};
    for (var i = 0; i < arguments.length; ++i) {
      for (var j in arguments[i]) {
        data[j] = arguments[i][j];
      }
    }

    if("show" in data) {
      var text = VuFind.translate("muni::eloan");
    }

    if("odkaz" in data) {
      eprez.innerHTML =
        "<a href='" + data.odkaz + "?sysno=" + sysno + "'>" +
        "<h3>" + text + "</h3>" +
        "</a>";
    } else if("show" in data) {
      eprez.innerHTML = "<h3>" + text + "</h3>";
    }
  }
  
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      eval(this.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
