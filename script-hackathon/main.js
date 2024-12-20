const ACTION_CLICK = "click";
const ACTION_REFRESH = "refresh";

const TIME_INTERVAL = 2 * 1000;
const KEY = "local-uuid";
const BASE_URL = "https://dbdb-202-149-221-42.ngrok-free.app";

const clicks = [];

window.addEventListener("unload", sendRefreshEvent);
window.addEventListener("beforeunload", sendRefreshEvent);

function sendRefreshEvent() {
  const url = `${BASE_URL}/api/v1/events`;
  try {
    const data = {
      unique_identifier: getUniqueIdentifier(),
      element_identifier: "",
      now: Date.now(),
      action: ACTION_REFRESH,
      url: window.location.href,
    };

    PostRequest(url, data);
  } catch (error) {
    console.log(error);
  }
}

// we are track for time interval
window.addEventListener("click", handleUserClick);
setInterval(() => sendDataToBackend(clicks), TIME_INTERVAL);

function handleUserClick(event) {
  const srcElement = event.srcElement;
  const element_identifier = srcElement.textContent;

  const data = {
    unique_identifier: getUniqueIdentifier(),
    element_identifier,
    now: Date.now(),
    action: ACTION_CLICK,
    url: window.location.href,
  };

  clicks.push(data);
}

async function sendDataToBackend(clicks) {
  console.log(clicks);

  const url = `${BASE_URL}/api/v1/events`;
  const data = await PostRequest(url, {
    clicks,
  });
  console.log(data);
}

// Utils
function getUniqueIdentifier() {
  let value = getLocalStorageData(KEY);
  if (!value) {
    value = crypto.randomUUID();
    setLocalStorage(KEY, value);
  }

  return value;
}

function setLocalStorage(key, data) {
  const jsonString = JSON.stringify(data);
  localStorage.setItem(key, jsonString);
}

function getLocalStorageData(key) {
  const jsonString = localStorage.getItem(key);
  if (!jsonString) return null;

  return JSON.parse(jsonString);
}

async function PostRequest(url, data) {
  try {
    const body = JSON.stringify(data);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
