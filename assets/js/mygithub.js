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
    // this.render()
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
        console.log(userData);
        this.createHeader();
      });
  }

  //   fetch(this.userApiUrl)
  //       .then(response => response.json())
  //       .then(userData => {
  //         this.data = userData;
  //         this.render();
  //       });
  //   }

  createHeader() {
    let user = this.userData;
    let userLocation;
    user.location != null
      ? (userLocation = `<div id="userLocation">${user.location}`)
      : (userLocation = ``);
    let userBio;
    user.bio != null
      ? (userBio = `<div id="userLocation">${user.bio}`)
      : (userBio = ``);
    let userDataOutput = `
    <div id="userAvatar"><img src="${user.avatar_url}"></div>
    <div id="userLogin">${user.login} (${
      user.public_repos
    } public repositories)</div>
    <div id="userName">${user.name}</div>
    <div id="userLocation">${userLocation}</div>
    <div id="userBio">${userBio}</div>
    <div id="followers"><a href="${
      user.followers_url
    }" target="_blank">Followers: ${user.followers}</div>
    <div id="following"><a href="${
      user.following_url
    }" target="_blank">Followers: ${user.following}</div> `;
    console.log(userDataOutput);
    document.querySelector("#myGithubUser").innerHTML = userDataOutput;
  }

  template() {
    let repoList = this.data;

    return repoList
      .map(repo => {
        let liveProjectLink;
        repo.homepage != null
          ? (liveProjectLink = `<a href="${
              repo.homepage
            }">View live application</a>`)
          : (liveProjectLink = `No live application available`);
        let repoDescription;
        repo.description != null
          ? (repoDescription = `${repo.description}`)
          : (repoDescription = `No description available`);
        return `
            <div class="flexbox border m-1 p-2 w-25">
            <div id="repoName"> ${repo.name}</div>
            <div id="repoDescription">${repoDescription}</div>
            <div id="repoLink"><a href="${
              repo.html_url
            }"> View repository on GitHub</a></div>
            <div id="liveAppLink">${liveProjectLink}</div>
            </div>
            `;
      })
      .join("");
  }

  render() {
    let output = "";
    const header = ``;
    const template = this.template();
    const flexboxLayoutTop = `<div class="d-flex flex-wrap justify-content-around">`;
    output += header;
    output += flexboxLayoutTop;
    output += template;
    output += `</div>`;
    this.htmlContainer.innerHTML = output;
  }
}

const myGithubRepos = new MyGithub("#myGithubOutput");
