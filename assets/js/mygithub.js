class MyGithub {
    constructor(domselector) {
        // debugger
        this.htmlContainer = document.querySelector(domselector);
        this.githubUser = `FeliOdras`
        this.apiUrl = `https://api.github.com/users/${this.githubUser}/repos?client_id=fd294f0cd34bb0c9d185&client_secret=5429a69b75c88ca46305aafd53715532c56e9abf`;
        this.requestData()
        // this.render()
    }

    requestData() {
        // debugger
        // const XHR = new XMLHttpRequest();
        // XHR.open("GET", this.apiUrl, true);
        // XHR.onload = function (e) {
        //     const repoList = XHR.response;
        //     console.log(`Repo List ${repoList}`);
        //     this.render();
        // }
        // XHR.send();

        fetch(this.apiUrl)
            .then(
                response => response.json()
            ).then(
                data => {
                    this.data = data

                    this.render()

                }
            )
    }

    template() {
        let repoList = this.data;

        return repoList.map(repo => {
            let liveProjectLink
            repo.homepage != null ? liveProjectLink = `<a href="${repo.homepage}">View live application</a>` : liveProjectLink = `No live application available`
            let repoDescription
            repo.description != null ? repoDescription = `${repo.description}` : repoDescription = `No description available`
            return `
            <div class="flexbox border m-1 p-2 w-25">
            <div id="repoName"> ${repo.name}</div>
            <div id="repoDescription">${repoDescription}</div>
            <div id="repoLink"><a href="${repo.html_url}"> View repository on GitHub</a></div>
            <div id="liveAppLink">${liveProjectLink}</div>
            </div>
            `
        }).join('')
    }


    render() {
        let output = "";
        const header = "";
        const template = this.template();
        const flexboxLayoutTop = `<div class="d-flex flex-wrap justify-content-around">`
        output += flexboxLayoutTop;
        output += template;
        output += `</div>`
        this.htmlContainer.innerHTML = output;
    }
}

const myGithubRepos = new MyGithub("#myGithubOutput");