const url = 'http://localhost:5001/addUser';

function addUser() {

    const user = {
        'user4': {
            'name': 'mark',
            'password': 'bufallo',
            'profession': 'software professional',
            'id': 4
        }
    }

    fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: JSON.stringify(user.user4)
    });
}
