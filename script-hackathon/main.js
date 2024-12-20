const ACTION_CLICK = "click";
const TIME_INTERVAL = 2 * 1000;
const KEY = "local-uuid";
const BASE_URL = "http://localhost:3000";

const clicks = [];

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("click", handleUserClick);

  // we are track for time interval
  setInterval(() => sendDataToBackend(clicks), TIME_INTERVAL);
});

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
  const body = JSON.stringify({
    clicks,
  });

  const url = `${BASE_URL}/api/v1/events`;
  const data = await PostRequest(url, body);
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

async function PostRequest(url, body) {
  try {
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
