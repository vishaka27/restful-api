const http = new XMLHttpRequest();
const url = 'http://localhost:5001/addUser';

function addUser() {

    const user = {
        'user4': {
            'name': 'vishaka',
            'password': 'vishaka',
            'profession': 'engineer',
            'id': 4
        }
    }
    http.open('POST', url, true);
    // http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // http.setRequestHeader('Access-Control-Allow-Origin', '*');

    // http.onreadystatechange = function() {
    //     if (http.readyState === 4 && http.status === 200) {
    //         console.log(http.responseText);
    //     }
    // }

    // http.send(user);
    http.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");
    // http.open("POST", url, true);
    http.send(user); 
}
