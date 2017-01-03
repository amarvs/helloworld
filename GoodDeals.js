"use strict";
var GoodDealsModule = GoodDealsModule || {};

GoodDealsModule.Load = function () {
    
var GoodDeal = React.createClass({
    displayName: "GoodDeal",
    render: function render() {
        return React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
                "div",
                { className: "item" },
                React.createElement(
                    "a",
                    { href: "", className: "title" },
                    React.createElement(
                        "h5",
                        null,
                        this.props.appitem.Title
                    )
                ),
                React.createElement(
                    "span",
                    { className: "validperiod" },
                    "Promo Period: ",
                    this.props.appitem.PromoPer
                ),
                React.createElement(
                    "span",
                    { className: "author" },
                    "Posted By:",
                    this.props.appitem.PostedBy
                ),
                React.createElement(
                    "span",
                    { className: "timeago" },
                    "in ",
                    this.props.appitem.Date
                )
            )
        );
    }
});

var GoodDeals = React.createClass({
    displayName: "GoodDeals",


    mixins: [ComponentVisibilityMixin],

    getInitialState: function getInitialState() {
        return {
            promodata: [{ "Title": "Lorel Ipsum 1", "PromoPer": "01 Dec 2016 to 02 Jan 2017", "PostedBy": "MSS-PSC", "Date": "30/12/2016" }, { "Title": "Lorel Ipsum 1", "PostedBy": "MSS-PSC", "Date": "30/12/2016" }, { "Title": "Lorel Ipsum 1", "PromoPer": "28 Oct 2016 to 31 Mar 2017", "PostedBy": "MSS-PSC", "Date": "30/12/2016" }]
        };
    },
    retrieveFromWebService: function retrieveFromWebService() {
        var that = this;
        var url = '/SiteAssets/GoodDeals/sampledealsdata.js';
        fetch(url).then(function (response) {
            if (response.status >= 404) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            that.setState({ promodata: data });
        });
    },
    componentVisibilityChanged: function componentVisibilityChanged() {
        console.log('scroll into view');
        this.retrieveFromWebService();
        this.disableVisibilityHandling();
    },
    renderPromotions: function renderPromotions() {
        return this.state.promodata.map(function (promoitem) {
            return React.createElement(GoodDeal, { appitem: promoitem });
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "col-md-12 col-sm-6 col-xs-6 latesttrendinggroupbox" },
            React.createElement(
                "div",
                { className: "latesttrendinggroup latest" },
                React.createElement(
                    "div",
                    { className: "col-md-12" },
                    React.createElement(
                        "h4",
                        { className: "subheader" },
                        "LATEST"
                    )
                ),
                this.renderPromotions()
            )
        );
    }
});

ReactDOM.render(React.createElement(GoodDeals, null), document.getElementById('root'));
};