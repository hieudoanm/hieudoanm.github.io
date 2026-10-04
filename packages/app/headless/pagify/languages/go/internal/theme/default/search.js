/*
 * pagify default theme — client-side search.
 *
 * The build writes search-index.json next to the pages: one small JSON file
 * with each page's title, URL and text. This reads it once, lazily, the first
 * time the reader types. That keeps search working on any static host with no
 * server-side support and no build step for the frontend.
 *
 * The search box is a plain input in the generated markup; without this file
 * it simply does nothing, and the sidebar still navigates the whole site.
 */

(function () {
  "use strict";

  var MIN_QUERY = 2;
  var MAX_RESULTS = 20;

  function init() {
    var input = document.querySelector("[data-search]");
    var panel = document.querySelector("[data-search-panel]");
    var results = document.querySelector("[data-search-results]");
    var status = document.querySelector("[data-search-status]");
    if (!input || !panel || !results || !status) {
      return;
    }

    var source = input.getAttribute("data-search-index") || "/search-index.json";
    var pages = null;
    var loading = null;

    function load() {
      if (pages) {
        return Promise.resolve(pages);
      }
      if (!loading) {
        loading = fetch(source)
          .then(function (response) {
            return response.ok ? response.json() : [];
          })
          .then(function (documents) {
            pages = documents.map(function (document_) {
              return {
                title: document_.title || "",
                url: document_.url || "/",
                body: (document_.body || "").toLowerCase(),
              };
            });
            return pages;
          })
          .catch(function () {
            pages = [];
            return pages;
          });
      }
      return loading;
    }

    function search(query) {
      var matches = [];
      pages.forEach(function (page) {
        var title = page.title.toLowerCase();
        var inTitle = title.indexOf(query);
        if (inTitle < 0 && page.body.indexOf(query) < 0) {
          return;
        }
        // A title hit outranks a body hit, and an exact prefix outranks a
        // mid-word match, which is what a reader expects first.
        var score = 1;
        if (inTitle === 0) {
          score = 4;
        } else if (inTitle > 0) {
          score = 3;
        }
        matches.push({ page: page, score: score });
      });
      matches.sort(function (a, b) {
        return b.score - a.score || a.page.title.localeCompare(b.page.title);
      });
      return matches;
    }

    function show(pages_, query) {
      results.textContent = "";
      if (pages_.length === 0) {
        status.textContent = 'No matches for "' + query + '".';
        return;
      }
      status.textContent =
        pages_.length + (pages_.length === 1 ? " match" : " matches");
      pages_.slice(0, MAX_RESULTS).forEach(function (match) {
        results.appendChild(resultItem(match.page, query));
      });
    }

    input.addEventListener("input", function () {
      var query = input.value.trim().toLowerCase();
      if (query.length < MIN_QUERY) {
        panel.hidden = true;
        return;
      }
      load().then(function () {
        show(search(query), query);
        panel.hidden = false;
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !panel.hidden) {
        input.value = "";
        panel.hidden = true;
        input.blur();
      }
    });
  }

  function resultItem(page, query) {
    var item = document.createElement("li");
    var link = document.createElement("a");
    link.href = page.url;

    var title = document.createElement("strong");
    // The title comes from the author's own frontmatter, so it is inserted as
    // text with the matching term marked, never as raw markup.
    title.appendChild(markMatch(document.createTextNode(page.title), page.title, query));

    var context = document.createElement("span");
    context.textContent = page.url;

    link.appendChild(title);
    link.appendChild(context);
    item.appendChild(link);
    return item;
  }

  /* Splits a text node into plain and <mark> pieces around every match. */
  function markMatch(node, text, query) {
    var fragment = document.createDocumentFragment();
    var lower = text.toLowerCase();
    var offset = 0;
    var index = lower.indexOf(query);

    while (index >= 0) {
      fragment.appendChild(document.createTextNode(text.slice(offset, index)));
      var mark = document.createElement("mark");
      mark.textContent = text.slice(index, index + query.length);
      fragment.appendChild(mark);
      offset = index + query.length;
      index = lower.indexOf(query, offset);
    }
    fragment.appendChild(document.createTextNode(text.slice(offset)));
    return fragment;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
