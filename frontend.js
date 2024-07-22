const recapHeader = document.getElementById("recap");
const paragraph = document.getElementById("paragraph");
const aboutHeader = document.getElementById("aboutHeader");

function recapHTML() {
  paragraph.innerHTML = ''
  paragraph.innerHTML += 
  `<p> teste </p>`
};

function aboutHTML() {
  paragraph.innerHTML = ''
  paragraph.innerHTML +=
    `<p id="paragraph">
      lastrecap is a website that consumes the Last FM API to gather information about user’s, and their most listened tracks or albums.
    the usage is very simple, just type your Last FM username on “recap” and wait for the image to generate.
     </p>
     `

}

function welcomeParagraph(){
  paragraph.innerHTML +=
    `<p id="paragraph">
      lastrecap is a website that consumes the Last FM API to gather information about user’s, and their most listened tracks or albums.
    the usage is very simple, just type your Last FM username on “recap” and wait for the image to generate.
     </p>
     `
}
