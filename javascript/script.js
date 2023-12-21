
let form = document.getElementById('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let errors = {};

    let username = document.getElementById('user_name').value;
    if (username === '') {
        errors.username = "Username field cannot be empty";
    } else {
        errors.username = '';
    }

    let password = document.getElementById('pass').value;
    let repPassword = document.getElementById('rep_pass').value;

    if (password === '') {
        errors.password = 'Password field cannot be empty';
    } else {
        errors.password = '';
    }

    if (repPassword === '') {
        errors.repeatPassword = 'This field cannot be empty';
    } else if (repPassword !== password) {
        errors.repeatPasswordMatch = 'Passwords do not match';
    } else {
        errors.repeatPasswordMatch = '';
    }

    let mail = document.getElementById('mail').value;
    if (mail === '') {
        errors.mail = 'Mail field cannot be empty';
    } else {
        errors.mail = '';
    }

    let checkbox = document.getElementById('checker').checked;

    if (!checkbox) {
        errors.checkbox = 'You must agree to our Terms and Conditions';
    } else {
        errors.checkbox = '';
    }

    for (let el in errors) {
        let errorElement = document.getElementById(`id-${el}`);
    
        if (errorElement) {
            errorElement.innerText = errors[el];
        }
    }
    
    if (Object.keys(errors).length === 0) {
        form.submit();
    }
});


let pswd = document.getElementById('pass'); 
let icon = document.querySelector('.fa-eye-slash');

icon.addEventListener('click', () => {
    if (pswd.type === 'password') {
        pswd.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        pswd.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
});

function checkUser() {
    let username = document.getElementById('user_name').value;
    let checkP = document.getElementById('id-username');
    let nameRegex = /^[a-zA-Z\-]+$/;

    if (username.match(nameRegex)) {
        if (username.includes(' ')) {
            checkP.innerText = "Username should not contain spaces";
            checkP.style.color = 'red';
        } else {
            checkP.innerText = "Username is valid";
            checkP.style.color = 'green';
        }
    } else {
        checkP.innerText = "Invalid username format";
        checkP.style.color = 'red';
    }

    if (username === '') {
        checkP.innerText = '';
    }
}

document.getElementById('user_name').addEventListener('keyup', checkUser);


let ul = document.getElementById('ul');
let allUsers = [];


function filterUsers() {
    let input = document.getElementById('user_name').value.trim().toLowerCase();
    ul.innerHTML = '';

    fetch("https://reqres.in/api/users", {
        method: "GET",
    })
    .then(function (response) {
        return response.json();
    })
    .then((newData) => {
        newData.data.forEach(element => {
            let li = document.createElement('li');
            li.innerText = `${element.first_name} ${element.last_name}`
            allUsers.push({ id: element.id, name: element.first_name, lastName: element.last_name });
            ul.appendChild(li);

            li.addEventListener('click', () => {
                document.getElementById('user_name').value = `${element.first_name} ${element.last_name}`;
            });
        });

        ul.querySelectorAll('li').forEach(item => {
            let userFullName = item.innerText.trim().toLowerCase();
            if (!input || userFullName.includes(input)) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    })
    .catch(error => console.error('error', error));
}