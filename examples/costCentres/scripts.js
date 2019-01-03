const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
//request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.open('GET', 'http://omak:8070/pasdaily/rest/costCentre', true);

request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse([{"systemId":3507,"code":"1111111","name":"BC Cost Centre","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":3503,"code":"AB 6 W1","name":"AB 6 W1","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":3502,"code":"ABW1","name":"ABW1","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1003,"code":"AdifferentCC","name":"Different CC","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":3506,"code":"BCW1","name":"BCW1","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":3505,"code":"BCW2","name":"BCW2","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":3504,"code":"BT 19","name":"BT 19","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1026,"code":"Dbnonop","name":"Dbnonop","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1027,"code":"Dbop1","name":"Dbop1","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1028,"code":"Dbop2","name":"Dbop2","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1016,"code":"Drum 3-3","name":"Drumheller Bty 3-03","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1017,"code":"Drum 5-3","name":"Drumheller Bty 5-03","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1024,"code":"Heavy 08-02","name":"Heavy 08-02","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1025,"code":"Heavy 09-02","name":"Heavy 09-02","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1013,"code":"Medhat 10-04","name":"Medicine Hat Bty 10-04","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1014,"code":"Medhat 10-06","name":"Medicine Hat Bty 10-06","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1015,"code":"Medhat 10-08","name":"Medicine Hat Bty 10-08","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":3508,"code":"NONOP BT 2","name":"NONOP BT 2","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1002,"code":"Nonop CC","name":"Nonop CC","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":3509,"code":"NONOP GS","name":null,"active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1004,"code":"Redcliff4-05","name":"Redcliff Gas Bty 4-05","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1005,"code":"Redcliff4-06","name":"Redcliff Gas Bty 4-06","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1001,"code":"Redcliff4-07","name":"Redcliff Gas Bty 4-07","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1007,"code":"Redcliff4-08","name":"Redcliff Gas Bty 4-08","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1008,"code":"Redcliff5-09","name":"Redcliff Oil Bty 5-09","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1009,"code":"Redcliff5-10","name":"Redcliff Oil Bty 5-10","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1010,"code":"Redcliff5-11","name":"Redcliff Oil Bty 5-11","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1011,"code":"Redcliff5-12","name":"Redcliff Oil Bty 5-12","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1012,"code":"Redcliff5-13","name":"Redcliff Oil Bty 5-13","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":3501,"code":"SC1","name":"Test Cost Centre","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1018,"code":"Shallow01-13","name":"Shallow Gas Bty 01-13","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1019,"code":"Shallow01-14","name":"Shallow Gas Bty 01-14","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1020,"code":"Shallow01-15","name":"Shallow Gas Bty 01-15","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1021,"code":"Shallow01-16","name":"Shallow Gas Bty 01-16","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1022,"code":"Shallow01-17","name":"Shallow Gas Bty 01-17","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1023,"code":"Shallow01-18","name":"Shallow Gas Bty 01-18","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}},{"systemId":1006,"code":"Unit CC","name":"Unit Cost Center","active":true,"accountCode":null,"version":{"masterVersion":1,"nullPasVersion":false}}]);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(costCentre => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = costCentre.name;

      const p = document.createElement('p');
//      costCentre.code = costCentre.code.substring(0, 300);
      p.textContent = `${costCentre.code}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();
