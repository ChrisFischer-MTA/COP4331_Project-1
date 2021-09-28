export function createTimedAlert(
  context,
  message,
  time = 5000,
  parent = document.body,
  imagePath="../frontend/public/karen.jpg"
) {
  let alertDiv = document.createElement("div");
  let alertId = `${context}-alert-${Math.random().toString(16).slice(2)}`;
  console.log(message);
  console.log('Using picture path: ' + imagePath);

  alertDiv.innerHTML = `
  <div id="${alertId}" class="alert alert-${context} cm-alert cm-${context}-alert" role="alert" style="text-align: center;">
    ${(imagePath) ? `<img src="${imagePath}" width="200" height="112">` : ''}
    <p style="text-align: center; margin-top: ${(imagePath) ? '30px' : '0px'}; margin-bottom: 0px; font-size: 110%;">
      <b>${message}</b>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-square " viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    </p>
  </div>`;

  console.log(parent);
  parent.appendChild(alertDiv);
  document.getElementById(alertId).addEventListener("click", () => {
    try {
      parent.removeChild(alertDiv);
    } catch {}
  });

  setTimeout(
    () => {
      // Child might not exist if manually removed
      try {
        parent.removeChild(alertDiv);
      } catch (error) {}
    },
    time,
  );
}

export function dismissAllAlerts(parent) {
  parent.innerHTML = "";
}

export function createErrorAlert(message, alertPositionElement, timeout, imagePath=null) {
  if (imagePath) {
    createTimedAlert("danger", message, timeout, alertPositionElement, imagePath);
  }
  else {
    createTimedAlert("danger", message, timeout, alertPositionElement);
  }
}

export function createInfoAlert(message, alertPositionElement, timeout, imagePath=null) {
  createTimedAlert("info", message, timeout, alertPositionElement, imagePath);
}

export function dismissAlerts(alertPositionElement) {
  dismissAllAlerts(alertPositionElement);
}
