function breakUpURLParameters(url) {        //analyze and output the url parameters as a useful array to caller
    //  create a link in the DOM and set its href
    var link = document.createElement('a');
    link.setAttribute('href', url);

    return {
        host:     link.hostname,  //  'example.com'
        port:     link.port,      //  12345
        search:   mapMaker(link.search),  //  {startIndex: 1, pageSize: 10}
        path:     link.pathname,  //  '/blog/foo/bar'
        protocol: link.protocol   //  'http:'
    }
}

function mapMaker(search, preserveDuplicates) { //responsible for obtaining all url params, representing them into an array
    //  option to preserve duplicate keys (e.g. 'sort=name&sort=age')
    preserveDuplicates = preserveDuplicates || false;  //  disabled by default

    var outputNoDupes = {};
    var returnableArray = [];  //  optional output array to preserve duplicate keys

    //  sanity check
    if(!search) throw new Error('mapMaker: your search input param is misformed?');

    //  remove ? character from your url (?foo=1&bar=2 -> 'foo=1&bar=2')
    search = search.split('?')[1];

    //  split apart your keys into a useful array of key/value pairs ('foo=1&bar=2' -> ['foo=1', 'bar=2'])
    search = search.split('&');

    //  separate keys from values (['foo=1', 'bar=2'] -> [{foo:1}, {bar:2}])
    //  then package as an array for your caller to use as variables
    returnableArray = search.map(function(keyval){
        var out = {};
        keyval = keyval.split('=');
        out[keyval[0]] = keyval[1];
        outputNoDupes[keyval[0]] = keyval[1]; //  might as well do the no-dupe work too while we're in the loop
        return out;
    });
    return (preserveDuplicates) ? returnableArray : outputNoDupes;
}