(function ($) {

    // define the flixster API url so we can use it later
    var flixster = "http://api.rottentomatoes.com/api/public/v1.0/movies.jsonp?apikey=2w6rma75ygrbrnubvu7g5asc";

    var viewModel = kendo.observable({
        title: "Search Results",
        term: null,
        results: new kendo.data.DataSource({
            transport: {
                read: {
                    url: flixster,
                    dataType: "jsonp"
                },
                parameterMap: function (options, operation) {
                    // add the appropriate paramters the query string for flixster
                    if (operation === "read") {
                        return {
                            q: viewModel.get("term"),
                            page_limit: 10,
                            page: options.page
                        }
                    }
                }
            },
            schema: {
                data: "movies",
                total: "total"
            },
            change: function () {
                // set the title and hasChanges property
                viewModel.set("title", "Search Results For '" + viewModel.get("term") + "'");
                viewModel.set("hasResults", this.view().length > 0);
            },
            serverPaging: true,
            pageSize: 10
        }),
        search: function (e) {
            // populate the listview when the search button is clicked
            this.get("results").read();
        },
        hasResults: false
    });

    // bind the viewmodel to the body and create all widgets
    kendo.bind(document.body, viewModel);

} (jQuery));