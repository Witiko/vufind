function eprez_tag(sysno, client_ip) {

  if (sysno.substring(0, 5) != 'MUB01') {
    return;
  }

  sysno = sysno.replace(/^MUB0[1-3]/, "");

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

  test_ips = ['147.251.56.248',
              '147.251.2.60',
              '147.251.2.97',
              '147.251.56.209',
              '147.251.68.59',
              '147.251.17.76',
              '188.95.60.153',
              '95.82.147.69',
              '95.82.184.88',
              '81.19.8.196'];

  var eprez = document.getElementById("eprez");

  var a = document.createElement("a");
  if (in_array(client_ip, test_ips)) {
    a.href = "https://kic.ics.muni.cz/e-prezencka.cgi?sysno=" + sysno;
    a.appendChild(document.createTextNode(VuFind.translate("muni::eloan_terminal")));
    a.style.color = "red";
    a.style.fontWeight = "900";
  }
  var h3 = document.createElement("h3");
  h3.appendChild(a);

  eprez.appendChild(h3);

}
