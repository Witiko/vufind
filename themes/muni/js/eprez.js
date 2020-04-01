function eprez_tag(sysno) {
  sysno = sysno.replace(/^MUB0[1-3]/, "");
  var eprez = document.getElementById("eprez");
  var time = new Date().getTime();
  var url = "https://kic.ics.muni.cz/eprezencka/alephApi/toAleph.pl?sysno=" + sysno + "&jsoncallback=eprez_tag_callback&_=" + time;
  var xhttp = new XMLHttpRequest();

  function in_array(element, array) {
    var in_array = false;
    for (var i = 0; i < array.length; i++) {
      if (array[i] === element) {
        in_array = true;
        break;
      }
    }
    return in_array;
  }

  function eprez_tag_callback() {
    data = {};
    for (var i = 0; i < arguments.length; ++i) {
      for (var j in arguments[i]) {
        data[j] = arguments[i][j];
      }
    }

    if("show" in data) {
      var a = document.createElement("a");
      a.href = "https://kic.ics.muni.cz/e-prezencka.cgi?sysno=" + sysno;
      a.appendChild(document.createTextNode(VuFind.translate("muni::eloan_terminal")));
      a.style.color = "red";
      a.style.fontWeight = "900";
      var h3 = document.createElement("h3");
      h3.appendChild(a);
      eprez.appendChild(h3);
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
