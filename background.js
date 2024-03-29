async function createOffScreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["AUDIO_PLAYBACK"],
    justification: "play_ring_tone",
  });
}

chrome.alarms.create("drink", {
  delayInMinutes: 15,
  periodInMinutes: 15,
});

chrome.alarms.onAlarm.addListener(async ({ name }) => {
  switch (name) {
    case "drink":
      await createOffScreen();
      await chrome.runtime.sendMessage({ type: "drink" });
      break;
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  switch (command) {
    case "play-audio":
      await createOffScreen();
      await chrome.runtime.sendMessage({ type: "doit", action: "play" });
      break;
    case "stop-audio":
      await createOffScreen();
      await chrome.runtime.sendMessage({ action: "stop" });
      break;
  }
});
