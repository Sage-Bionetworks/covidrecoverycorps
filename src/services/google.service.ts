export const GoogleService = {
  sendPageView,
}

function sendPageView() {
  const windowAny: any = window
  const gtag = windowAny.gtag
  if (gtag) {
    gtag('config', 'UA-148914952-2', {
      page_location: window.location.href,
      page_path: window.location.pathname,
    })
  }
}

function sendEvent(
  action: string,
  category: string,
  label: string,
  value: string,
) {
  const windowAny: any = window
  const gtag = windowAny.gtag
  if (gtag) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
