

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

export const RESTService = {

    login,
    register,
    fetchHomeProject,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
        'Accept':'application/json'},
        body: JSON.stringify({ username, password })
    };

    return fetch(`${api}/users/authenticate`, requestOptions)
        .then(response => {
            console.log("response.statusText");
          //  console.log(response.statusText);

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            console.log("*****response json");
           // console.log(response.json());
               return response.json();
            }
        )               //add response not ok line here
        .then(user => {
            // login successful if there's a token in the response? implementation pending
            console.log("Then Users:");

            console.log(user);

            console.log("Then Users token:");

            console.log(user.user.username);
            if (user && user.user.username) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
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
        body: JSON.stringify(user)
    };

    return fetch(`${api}/home/getdetails`, requestOptions).then(handleResponse);
}



function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}
