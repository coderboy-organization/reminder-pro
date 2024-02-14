const drink = document.querySelector("#drink");
const doit = document.querySelector("#doit");

chrome.runtime.onMessage.addListener(async ({ type }) => {
  console.log("type:", type);
  switch (type) {
    case "drink":
      playAudio("play");
      break;
    case "doit":
      await doit?.play();
      break;
  }
});

chrome.runtime.onMessage.addListener(({ action }) => {
  if (action === "stop") {
    playAudio("stop");
  }
});

async function playAudio(status) {
  switch (status) {
    case "play":
      await drink?.play();
      break;
    case "stop":
      drink?.pause();
      doit?.pause();
      break;
  }
}
