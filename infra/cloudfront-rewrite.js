// CloudFront viewer-request function for unopenedworlds.com.
//
// It does two jobs, in this order: send every request to the one canonical URL
// for the thing it asked for, and then map that URL onto the flat file the
// static export actually produced.
//
// CANONICAL URL. The distribution answers on both unopenedworlds.com and
// www.unopenedworlds.com, and the rewrite below means /planetfall,
// /planetfall/ and /planetfall.html all serve the same page with a 200. That
// is three spellings of one page on two hosts, and Search Console reported
// exactly that: game pages flagged "Alternative page with proper canonical
// tag" and the wall, which had no canonical of its own, flagged "Duplicate
// without user-selected canonical". A canonical tag is a hint; a 301 is not,
// so anything that is not the apex host with an extensionless, slash-free path
// is redirected to the spelling the sitemap names.
//
// FLAT FILE. Every game prerenders to a flat file such as planetfall.html, but
// its real URL is /planetfall. S3's REST origin has no notion of index
// documents or extension fallback, so without this the request misses, and the
// distribution's 404 -> /index.html rule would serve the wall under every game
// URL with a 200.
//
// Anything already carrying an extension (/collection/x.jpg, /planetfall.rsc,
// /_next/...) keeps its URL, apart from the .html files the redirect folds
// away. The root is left to DefaultRootObject.
var CANONICAL_HOST = 'unopenedworlds.com';

function handler(event) {
  var request = event.request;
  var hostHeader = request.headers.host;
  var host = hostHeader ? hostHeader.value.toLowerCase() : CANONICAL_HOST;
  var uri = request.uri;

  // The canonical spelling of this path: no trailing slash, no .html, and
  // /index.html written as the root it already serves.
  var canonicalUri = uri;
  if (canonicalUri.length > 1) {
    canonicalUri = canonicalUri.replace(/\/+$/, '');
  }
  if (canonicalUri.slice(-5) === '.html') {
    canonicalUri = canonicalUri.slice(0, -5);
  }
  if (canonicalUri === '/index' || canonicalUri === '') {
    canonicalUri = '/';
  }

  if (host !== CANONICAL_HOST || canonicalUri !== uri) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://' + CANONICAL_HOST + canonicalUri + buildQueryString(request.querystring) },
      },
    };
  }

  if (uri === '/') {
    return request;
  }

  var lastSegment = uri.slice(uri.lastIndexOf('/') + 1);
  if (lastSegment.indexOf('.') !== -1) {
    return request;
  }

  request.uri = uri + '.html';
  return request;
}

// A redirect that drops the query string would quietly break any link carrying
// one, so rebuild it from the parsed object CloudFront hands us. Each entry is
// either { value } or { multiValue: [{ value }, ...] }.
function buildQueryString(querystring) {
  var pairs = [];
  for (var name in querystring) {
    var parameter = querystring[name];
    var values = parameter.multiValue || [parameter];
    for (var i = 0; i < values.length; i++) {
      var value = values[i].value;
      pairs.push(value === '' ? encodeURIComponent(name) : encodeURIComponent(name) + '=' + encodeURIComponent(value));
    }
  }
  return pairs.length ? '?' + pairs.join('&') : '';
}
