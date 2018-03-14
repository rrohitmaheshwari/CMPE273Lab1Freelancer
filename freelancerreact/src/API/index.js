

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

export const RESTService = {

    login,
    register,
    fetchHomeProject,
    logout
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept':  'application/json',
            'Content-Type': 'application/json',

            },
        credentials:'include',
        body: JSON.stringify({ username, password }),

    };

    return fetch(`${api}/users/authenticate`, requestOptions)
        .then(response => {

            console.log("response.statusText");

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            console.log("*****response json");

               return response.json();
            }
        )               //add response not ok line here
        .then(user => {

            console.log("Then Users:");

            console.log(user);

            console.log("Then Users token:");

            console.log(user.user.username);
            if (user && user.user.username) {

                localStorage.setItem('user', JSON.stringify(user.user));

                console.log("Local Storage Set");
            }

            return user.user;
        });
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Accept':'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${api}/users/register`, requestOptions).then(handleResponse);
}



function fetchHomeProject(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Accept':'application/json' },
        credentials:'include',
        body: JSON.stringify(user)
    };

    return fetch(`${api}/home/getdetails`, requestOptions).then(handleResponse);
}

function logout() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Accept':'application/json' },
        credentials:'include'
    };

    return fetch(`${api}/user/logout`, requestOptions).then(handleResponse)
        .then(response => {
            localStorage.removeItem('user');
            console.log(response)
        });
}




function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}
