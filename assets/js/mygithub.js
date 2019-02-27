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
        console.log(repoList)

        return repoList.map(repo => {
            var liveProjectLink
            repo.homepage != null ? liveProjectLink = `<div id="liveAppLink"><a href="${repo.homepage}">View live application</a></div>` : liveProjectLink = `<div id="liveAppLink"> No live application available </div>`
            return `
            <div class="flexbox border m-1 p-2">
            <div id="repoName"> ${repo.name}</div>
            <div id="repoLink"><a href="${repo.html_url}"> View repository on GitHub</a></div>
            ${liveProjectLink}
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
        console.log(output);
    }
}

const myGithubRepos = new MyGithub("#myGithubOutput");
console.log(myGithubRepos);