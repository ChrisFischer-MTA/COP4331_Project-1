export function createTimedAlert(context, message, time=5000, parent=document.body) {
  let alertDiv = document.createElement('div');
  let alertId = `${context}-alert-${Math.random().toString(16).slice(2)}`;
  console.log(message);

  alertDiv.innerHTML = `
  <div id="${alertId}" class="alert alert-danger cm-alert" role="alert">
    ${message}
  </div>`;

  console.log(parent);
  parent.appendChild(alertDiv);

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
