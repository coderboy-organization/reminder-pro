const drink = document.querySelector("#drink");

chrome.runtime.onMessage.addListener(async ({ type }) => {
  switch (type) {
    case "drink":
      playAudio("play");
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
      break;
  }
}
