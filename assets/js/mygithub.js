class MyGithub {
    constructor(domselector) {
        // debugger
        this.htmlContainer = document.querySelector(domselector);
        this.githubUser = `FeliOdras`;
        this.apiUrl = `https://api.github.com/users/${
      this.githubUser
    }/repos?client_id=fd294f0cd34bb0c9d185&client_secret=5429a69b75c88ca46305aafd53715532c56e9abf`;
        this.userApiUrl = `https://api.github.com/users/${
      this.githubUser
    }?client_id=fd294f0cd34bb0c9d185&client_secret=5429a69b75c88ca46305aafd53715532c56e9abf`;
        this.requestData();
        this.requestUserData();
    }

    requestData() {
        fetch(this.apiUrl)
            .then(response => response.json())
            .then(data => {
                this.data = data;
                this.render();
            });
    }

    requestUserData() {
        fetch(this.userApiUrl)
            .then(response => response.json())
            .then(userData => {
                this.userData = userData;
                this.createHeader();
            });
    }

    searchUser() {
        this.githubUser = document.querySelector('#search-field').value;
        this.apiUrl = `https://api.github.com/users/${
      this.githubUser
    }/repos?client_id=fd294f0cd34bb0c9d185&client_secret=5429a69b75c88ca46305aafd53715532c56e9abf`;
        this.userApiUrl = `https://api.github.com/users/${
      this.githubUser
    }?client_id=fd294f0cd34bb0c9d185&client_secret=5429a69b75c88ca46305aafd53715532c56e9abf`;
        this.requestData();
        this.requestUserData();
    }

    addEventListeners() {
        const searchButton = document.querySelector('#search-button');
        searchButton.addEventListener('click', () => this.searchUser());
    }

    createHeader() {
        let user = this.userData;
        let userName;
        user.name != null ? userName = `<div id="userName" class="mt-3 mb-1"> <i class="fas fa-user mr-2"> </i> ${user.name}</div >` : userName = ``;
        let userLocation;
        user.location != null ?
            userLocation = `<div id = "userLocation" > <i class="fas fa-compass mr-2"></i>${
        user.location} </div>` :
            userLocation = ``;
        let userBio;
        user.bio != null ?
            userBio = `<div id="userBio">${user.bio}</div>` :
            userBio = ``;
        let userDataOutput = `
    <div class="jumbotron text-left bg-secondary text-white p-3 m-0 clearfix">
    <div id="userAvatar" class="mr-4 p-3 text-center float-left border w-240px"><img class="img-thumbnail mb-3 rounded-circle" src="${
      user.avatar_url
    }"><br>
    <span class="small">${userBio}</span>
    </div>
    <div id="userLogin" class="font-weight-bold text-warning">${
      user.login
    } </div>
    <div class="text-light font-italic small">(${
      user.public_repos
    } public repositories)</div>
    ${userName}
    <div id="userLocation" class="mb-1">${userLocation}</div>
    <button id="followers" class="bg-tertiary d-inline p-1 small rounded border-0"><a href="https://github.com/${this.githubUser}?tab=followers" target="_blank" class="text-white text-decoration-none">Followers: ${user.followers}</button>
    <button id="following" class="bg-tertiary d-inline p-1 small rounded border-0"><a href="https://github.com/${this.githubUser}?tab=following" target="_blank" class="text-white text-decoration-none">Following: ${user.following}</button>
    </div> `;
        document.querySelector("#myGithubUser").innerHTML = userDataOutput;
    }

    template() {
        let repoList = this.data;

        return repoList
            .map(repo => {
                let liveProjectLink;
                repo.homepage != null ?
                    (liveProjectLink = `<button class="bg-danger rounded small w-45 float-right border-0"><a class="text-white text-decoration-none" href="${
              repo.homepage
            }">View live application</a></button>`) :
                    (liveProjectLink = `<button class="not-available small w-45 text-white rounded border-0 float-right">No live application </button>`);
                let repoDescription;
                repo.description != null ?
                    (repoDescription = `${repo.description}`) :
                    (repoDescription = `<span class="not-available font-italic">No description available</span>`);
                return `
            <div class="flexbox border m-1 w-240px bg-light-yellow">
            <h3 class="repoName p-1 bg-warning text-light text-center font-weight-bold"> ${repo.name}</h3>
            <div class="p-2 clearfix">
            <div class="repoDescription small text-muted">${repoDescription}</div>
            <hr class="mt-2 mb-2">
            <div class="repoLink"><button class="float-left bg-tertiary small border-0 w-45 d-inline rounded"><a class="text-white text-decoration-none" href="${
              repo.html_url
            }"> View repository on GitHub</a></button></div>
            <div class="liveAppLink">${liveProjectLink}</div>
            </div>
            </div>
            `;
            })
            .join("");
    }

    render() {
        let output = "";
        let user = this.userData;
        const template = this.template();
        const flexboxLayoutTop = `<div class="d-flex flex-wrap justify-content-around">`;
        output += `<h2 class="h2-title pl-2 pr-2 pt-2 text-white pb-1 font-weight-bold">${this.githubUser}'s repositories</h2>`
        output += flexboxLayoutTop;
        output += template;
        output += `</div>`;
        this.htmlContainer.innerHTML = output;
        this.addEventListeners()
    }
}

const myGithubRepos = new MyGithub("#myGithubOutput");