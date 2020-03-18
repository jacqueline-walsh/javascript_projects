const textBtn = document.getElementById('getText');
const userBtn = document.getElementById('getUsers');
const postBtn = document.getElementById('getPosts');
const postForm = document.getElementById('postForm');
const clearFetch = document.getElementById('clearBtn');
const output = document.getElementById('output');

//FUNCTIONS
function getText() {
    fetch('sample.txt')
        .then(res => res.text())
        .then(data => output.innerText = data)
        .catch(err => console.log(err));
}

function getUsers() {
    fetch('users.json')
        .then(res => res.json())
        .then(data => {
            let text = `<h2 class="mb-4">Users</h2>`;
            data.forEach(user => {
                text += `
                    <ul class="list-group mb-3">
                        <li class="list-group-item">ID: ${user.id}</li>
                        <li class="list-group-item">Name: ${user.name}</li>
                        <li class="list-group-item">Email: ${user.email}</li>
                    </ul>
                `;
            });
            output.innerHTML = text;
        })
        .catch(err => console.log(err));
}

//  Get post from https://jsonplaceholder.typicode.com/posts
async function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
            let text = `<h2 class="mb-4">Posts</h2>`
            data.forEach(post => {
                text += `   
                    <div class="card card-body mb-3">
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>  
                    </div>   
                `
            });
            output.innerHTML = text;
        })
        .catch(err => console.log(err));
}

function addPost(e) {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title:title, body:body
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))

    postForm.reset();
}

function clearOutput() {
    output.innerHTML = '';  
}

// EVENT LISTENER
textBtn.addEventListener('click', getText);
userBtn.addEventListener('click', getUsers);
postBtn.addEventListener('click', getPosts);
postForm.addEventListener('submit', addPost);
clearFetch.addEventListener('click', clearOutput);
