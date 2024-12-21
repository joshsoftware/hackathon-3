import { captureImage } from "./image";

const ACTION_CLICK = "click";
const ACTION_REFRESH = "refresh";

const TIME_INTERVAL = 2 * 1000;
const KEY = "local-uuid";
const BASE_URL = "http://127.0.0.1:3000";

let clicks = [];
let clickImage = "";

window.addEventListener("unload", sendRefreshEvent);
window.addEventListener("beforeunload", sendRefreshEvent);

async function sendRefreshEvent() {
  const url = `${BASE_URL}/api/v1/events`;
  try {
    const data = {
      uid: getUniqueIdentifier(),
      element_id: "",
      now: Date.now(),
      action: ACTION_REFRESH,
      url: window.location.href,
    };

    await MakeRequest("POST", url, data);
  } catch (error) {
    console.log(error);
  }
}

// we are track for time interval
window.addEventListener("click", handleUserClick);
setInterval(() => sendDataToBackend(clicks), TIME_INTERVAL);

async function handleUserClick(event) {
  const srcElement = event.srcElement;
  const element_id = srcElement.textContent.trim();

  const data = {
    uid: getUniqueIdentifier(),
    element_id,
    now: Date.now(),
    action: ACTION_CLICK,
    url: window.location.href,
  };

  clicks.push(data);
  clickImage = await captureImage();
}

async function sendDataToBackend() {
  if (!clicks || clicks.length == 0) {
    return;
  }

  const url = `${BASE_URL}/api/v1/events`;
  const response = await MakeRequest("POST", url, { clicks });
  const ids = response.data;

  if (clickImage != "" && ids?.length > 0) {
    const url = `${BASE_URL}/api/v1/aggregate_events`;

    const body = {
      ids,
      screenshot: clickImage,
    };

    await MakeRequest("PUT", url, body);
  }

  // clear the clicks
  clicks = [];
  clickImage = "";
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

async function MakeRequest(method, url, data) {
  try {
    const body = JSON.stringify(data);
    const response = await fetch(url, {
      method: method,
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
