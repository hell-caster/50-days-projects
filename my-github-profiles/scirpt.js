const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username){
    try{
        const {data} = await axios(APIURL + username )
        createUserCard(data)
        getRepos(username)
    }catch(err){
        if(err.response && err.response.status == 404){
            createErrorcard('No profile with username')
        }
    }
}

async function getRepos(username){
    try{
        const {data} = await axios(APIURL + username + '/repos?sort=created')
        
        addReposToCard(data)
    } catch(err){
        createErrorcard('Problem fetching repos')
    }

}

function createUserCard(user){
    const userID = user.name || user.login
    const userBio  = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class = "user-info">
            <h2>${userID}></h2>
            ${userBio}
            <ul>
                <li>${user.followers} <strong>Following</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Following</strong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>
    `
    main.innerHTML = cardHTML
}

function createErrorcard(msg){
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `
    main.innerHTML = cardHTML
}

function addReposToCard(repos){
    const reposE1 = document.getElementById('repos')

    repos
        .slice(0,5)
        .forEach(repo => {
            const repoE1 = document.createElement('a')
            repoE1.classList.add('repo')
            repoE1.href = repo.html_url
            repoE1.target = '_blank'
            repoE1.innerText = repo.name

            reposE1.appendChild(repoE1)
        })
}

form.addEventListener('submit',(e) => {
    
    console.log(e)
    e.preventDefault()

    const user = search.value

    if(user){
        getUser(user)
        search.value = ''
    }
})