//Initialize

function passCheck() {
  if (!(document.getElementById('password').value == "")) {
    return true;
  } else {
    alert("Please input a password!");
    return false;
  }
}

function encrypt() {
  if (passCheck()) {
    document.getElementById('result').value = Jcrypter.encrypt(document.getElementById('password').value, document.getElementById('cipher').value);
  }
}

function decrypt() {
  if (passCheck()) {
    document.getElementById('result').value = Jcrypter.decrypt(document.getElementById('password').value, document.getElementById('cipher').value);
  }
}

//JavasCrypter

Jcrypter = {};

function toAscii(s, bool) {
  var r = [];
  var chars = s.split("");
  for (var i = 0; i < s.length; i++) {
    r.push(chars[i].charCodeAt(0));
  }
  return r;
}

function fromAscii(c) {
  var r = "";
  for (var i = 0; i < c.length; i++) {
    r += String.fromCharCode(c[i]);
  }
  return r;
}

function obf(str) {
  var keyGen = new Math.seedrandom(str);
  var seed = Math.round(keyGen() * 10000000000).toString().split("");
  return seed;
}

//End of Utilities

Jcrypter.encrypt = function(pw, txt) {

  var seed = obf(pw);
  var txtAscii = toAscii(txt);

  for (var x = 0, inc = 0; x < txt.length; x++, inc++) {
    if (inc > seed.length - 1) {
      inc = 0;
    }
    txtAscii[x] = parseInt(txtAscii[x]) + parseInt(seed[inc]);
  }

  var encTxt = fromAscii(txtAscii);
  return encTxt;
}

Jcrypter.decrypt = function(pw, encTxt) {

  var seed = obf(pw);
  var txtAscii = toAscii(encTxt);
  var rem = (encTxt.length - 1) % (seed.length);

  if (rem == 0) {
    rem = seed.length - 1;
  }
  for (var x = encTxt.length - 1, inc = rem; x >= 0; x--, inc--) {
    if (inc < 0) {
      inc = seed.length - 1;
    }
    txtAscii[x] = parseInt(txtAscii[x]) - parseInt(seed[inc]);
  }

  var decTxt = fromAscii(txtAscii);
  return decTxt;
}