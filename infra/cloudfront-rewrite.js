// CloudFront viewer-request function for unopenedworlds.com.
//
// The site is a static export: every game prerenders to a flat file such as
// planetfall.html, but its real URL is /planetfall. S3's REST origin has no
// notion of index documents or extension fallback, so without this the request
// misses, and the distribution's 404 -> /index.html rule would serve the wall
// under every game URL with a 200.
//
// Anything already carrying an extension (/collection/x.jpg, /planetfall.rsc,
// /_next/...) is left alone, as is the root, which DefaultRootObject handles.
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri === '/') {
    return request;
  }

  var lastSegment = uri.slice(uri.lastIndexOf('/') + 1);
  if (lastSegment.indexOf('.') !== -1) {
    return request;
  }

  request.uri = uri.replace(/\/+$/, '') + '.html';
  return request;
}
