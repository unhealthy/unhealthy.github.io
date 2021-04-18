
function renderHeader() {

  //     <a class="navbar-item ${location.pathname === "/" ? "is-active" : ""
  // }" href="./">Home</a>
  //   <a class="navbar-item ${location.pathname === "/team.html" ? "is-active" : ""
  // }" href="./team.html">Team</a>

  document.body.insertAdjacentHTML(
    "afterbegin",
    `
  <nav class="navbar is-transparent p-3 pl-5 pr-5">
    <div class="container is-max-widescreen">
      <div class="navbar-brand">
        <a class="navbar-item" href="./">Zhutian Chen</a>
        <span
          id="navbar-burger-id"
          class="navbar-burger burger"
          data-target="navbarMenuHeroA"
          onclick="document.querySelector('.navbar-menu').classList.toggle('is-active');"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>
  
      <div id="navbar-menu-id" class="navbar-menu">
        <div class="navbar-end">
        <a class="navbar-item" href="./blogs/">Blog</a>
        </div>
      </div>
    </div>
  </nav>`
  );
}

function renderFooter() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <footer class="footer has-text-centered">
    <p>
    All right reserved.
  </p>
  </footer>
    `
  );
}

function pubCard(data, authorLookup) {
  const authors = data.authors
    .split(",")
    .map((author) => {
      author = author.trim();

      return author === 'Zhutian Chen'
        ? `<strong>${author}</strong>`
        : author
    })
    .join(", ");

  const title =
    data.title == ""
      ? data.name
      : `${data.name} <span class="sub"> ${data.title}</span>`;

  const coming_soon = data.thumbnail.includes("comingsoon");

  // parse website
  if (data.website && data.website.startsWith('/')) {
    data.website = data.website.split(':')[0]
  }

  const extenalLink = {
    paper: { icon: "open-outline", text: ".pdf" },
    video: { icon: "logo-youtube", text: "video" },
    website: { icon: "link-sharp", text: "site" },
    // code: { icon: "fa-home" },
  };

  const links = Object.keys(data.links)
    .map(key => ` <span>
    <a
      href="${data.links[key]}"
      target="_blank"
      rel="external"
      >${key}</a
    >
  </span>`).join('')

  return `
  <div class="pub-card">
  <div class="columns">
    <div class="column is-offset-1-mobile is-10-mobile">
      <figure class="image is-5by4">
        <img src="${data.thumbnail}" />
      </figure>
    </div>

    <div class="column is-four-fifths">
      <div class="content">
        <p class="title">
          ${data.title}
        </p>
        <p class="authors">
          ${authors}
        </p>
        <p class="venue">
          <span class="short">${data.venue.short}</span>:
          <em>${data.venue.long}</em>, ${data.venue.year}
        </p>
        <p class="link">
          ${links}
        </p>
      </div>
    </div>
  </div>
</div>
  `
}

async function loadAndRenderPublications() {
  const pubs = await (await fetch("/assets/publications.json")).json();
  // const authors = await (await fetch("/assets/authors.json")).json();

  document.querySelector(".publications").insertAdjacentHTML(
    "beforeend",
    pubs.map((pub) => pubCard(pub, {})).join("")
  );
}

/** Render the page */
renderHeader();

// if (location.pathname === "/") {
loadAndRenderPublications();
// } else if (location.pathname === "/team.html") {
//   loadAndRenderLabPeople();
// }



renderFooter();
