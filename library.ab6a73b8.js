!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l={},t={},a=n.parcelRequired7c6;null==a&&((a=function(e){if(e in l)return l[e].exports;if(e in t){var n=t[e];delete t[e];var a={id:e,exports:{}};return l[e]=a,n.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},n.parcelRequired7c6=a);var r=a("4Nugj");a("j1lrD");var o=a("5FyuU"),i=a("jR9u2"),s=new(0,o.default),c=JSON.parse(localStorage.getItem("queue-list"));Promise.all(s.fetcByMultipleIds(c)).then((function(n){var l;console.log(n),l=n.map((function(n){var l=n.data,t=l.id,a=l.poster_path,r=l.original_title,o=e(i)(n.data.release_date).format("YYYY");return'\n        <li class="gallery-item" data-id = \''.concat(t,"'>\n                <img src=\"https://image.tmdb.org/t/p/w300").concat(a,'" alt="film poster" class=\'film-poster\'/>\n                <p class="film-name">').concat(r,'</p>\n                <p class="film-descr">\n                    <span class="film-genres"></span> |\n                    <span class="film-premier">').concat(o,"</span>\n                </p>\n        </li>")})),console.log(l.join("")),r.refs.gallery.insertAdjacentHTML("beforeend",l.join(""))}))}();
//# sourceMappingURL=library.ab6a73b8.js.map
