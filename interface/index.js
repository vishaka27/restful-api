const http = new XMLHttpRequest();
const posturl = 'http://localhost:5001/addUser';
const response = new Response();
var data;

function addUser() {
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    var profession = document.getElementById('profession').value;
    axios.get('http://localhost:5001/listUsers').then(response => {
        users = response.data;
        count = Object.keys(users).length;
        const user = {
            'user4': {
                'name': name,
                'password': password,
                'profession': profession,
                'id': count + 1
            }
        }
        fetch(posturl, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: JSON.stringify(user.user4)
        });
    });
}

function showDetails() {
    const id = document.getElementById("field").value;
    axios.get('http://localhost:5001/' + id).then(response => {
        data = response.data;
        if (data) {
            // CREATE DYNAMIC TABLE.
            var table = document.createElement("table");

            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var thead = table.createTHead();                   // TABLE ROW.
            var col = ["S.No", "Name", "Password", "Profession"];
            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i];
                thead.appendChild(th);
            }
            tr = table.insertRow(-1);
            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < Object.keys(data).length; i++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[`${Object.keys(data)[i]}`];
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);
            document.getElementById('noData').style.display = 'none';
        }
        if (data === '') {
            var divContainer = document.getElementById('noData');
            divContainer.innerHTML = 'No records found';
            divContainer.style.display = 'block';
            divContainer.style.color = 'red';
        }
    });
}
