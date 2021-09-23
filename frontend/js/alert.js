export function createTimedAlert(context, message, time=5000, parent=document.body) {
  let alertDiv = document.createElement('div');
  let alertId = `${context}-alert-${Math.random().toString(16).slice(2)}`;
  console.log(message);

  alertDiv.innerHTML = `
  <div id="${alertId}" class="alert alert-danger cm-alert" role="alert">
    <p>${message}
      <i class="bi bi-x close"></i>
    </p>
  </div>`;

  console.log(parent);
  parent.appendChild(alertDiv);
  document.getElementById(alertId).addEventListener('click', () => {
    try {
      parent.removeChild(alertDiv);
    } catch {}
  });

  setTimeout(
    () => {
      // Child might not exist if manually removed
      try {
        parent.removeChild(alertDiv)
      } catch (error) {}
    }, 
    time);
}

export function dismissAllAlerts(parent) {
  parent.innerHTML = '';
}

export function createErrorAlert (message, alertPositionElement, timeout) { 
	createTimedAlert('danger', message, timeout, alertPositionElement);
}

export function createInfoAlert (message, alertPositionElement, timeout) { 
	createTimedAlert('info', message, timeout, alertPositionElement);
}

export function dismissAlerts (alertPositionElement) { 
	dismissAllAlerts(alertPositionElement);
}
