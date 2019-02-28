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
        console.log(this.githubUser)
        console.log(this.apiUrl)
        this.requestData();
        this.requestUserData();
    }

    addEventListeners() {
        const searchButton = document.querySelector('#search-button');
        searchButton.addEventListener('click', () => this.searchUser());
    }

    createHeader() {
        let user = this.userData;
        let userLocation;
        user.location != null ?
            (userLocation = ` <div id = "userLocation" > ${
                user.location} </div>`) :
            (userLocation = ``);
        let userBio;
        user.bio != null ?
            (userBio = `<div id="userLocation">${user.bio}</div>`) :
            (userBio = ``);
        let userDataOutput = `
    <div class="jumbotron text-left bg-secondary text-white p-3 clearfix">
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
    <div id="userName" class="mt-3">${user.name}</div>
    <div id="userLocation">${userLocation}</div>
    <button id="followers" class="bg-warning d-inline p-1 small rounded border-0"><a href="https://github.com/${this.githubUser}?tab=followers" target="_blank" class="text-white text-decoration-none">Followers: ${user.followers}</button>
    <button id="following" class="bg-warning d-inline p-1 small rounded border-0"><a href="https://github.com/${this.githubUser}?tab=following" target="_blank" class="text-white text-decoration-none">Following: ${user.following}</button>
    </div> `;
        document.querySelector("#myGithubUser").innerHTML = userDataOutput;
    }

    template() {
        let repoList = this.data;

        return repoList
            .map(repo => {
                let liveProjectLink;
                repo.homepage != null ?
                    (liveProjectLink = `<a href="${
              repo.homepage
            }">View live application</a>`) :
                    (liveProjectLink = `<span class="not-available">No live application available</span>`);
                let repoDescription;
                repo.description != null ?
                    (repoDescription = `${repo.description}`) :
                    (repoDescription = `<span class="not-available">No description available</span>`);
                return `
            <div class="flexbox border m-1 p-2 w-240px">
            <div class="repoName"> ${repo.name}</div>
            <div class="repoDescription">${repoDescription}</div>
            <div class="repoLink"><a href="${
              repo.html_url
            }"> View repository on GitHub</a></div>
            <div class="liveAppLink">${liveProjectLink}</div>
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
        output += `<h2>${this.githubUser}'s repositories</h2>`
        output += flexboxLayoutTop;
        output += template;
        output += `</div>`;
        this.htmlContainer.innerHTML = output;
        this.addEventListeners()
    }
}

const myGithubRepos = new MyGithub("#myGithubOutput");