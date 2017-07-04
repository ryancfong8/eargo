export const fetchGizmodo = () => (
  $.ajax({method: 'GET', url: 'api/wikis'})
);
// $.ajax({method: 'GET', url: `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&list=&meta=&continue=&titles=Gizmodo%7CPopular+Science%7CPC+Magazine+%7CGeekWire%7CThe+Verge%7CTechcrunch&rvprop=content&rvsection=0`})
