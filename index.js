// Settings
var baseStyle = "card text-white text-center m-2";
var apiInfo = {
    url: "https://status.mojang.com/check",
    method: "get",
};
var loadedDelayTime = 1500;

// Vue app
var bugjangStatus = new Vue({
    el: "#bugjangStatus",
    data: {
        servicesList: [],
        checkApiAlive: true,
        isLoading: true,
        loadButtonStatus: "loading",
        responseTime: null,
        styleClassMap: {
            card: {
                red: `${baseStyle} bg-danger`,
                yellow: `${baseStyle} bg-warning`,
                green: `${baseStyle} bg-success`,
            },
            loadButton: {
                wait: "fa fa-refresh",
                loading: "fa fa-refresh fa-spin",
                success: "fa fa-check",
                failure: "fa fa-times",
            },
        },
    },
    computed: {
        disableLoadButton: function () {
            var status = this.loadButtonStatus;
            return status == "loading" || status == "success";
        }
    },
    methods: {
        refreshStatus: function () {
            refreshApiStatus(this);
        },
    },
    created() {
        configToastr();
        getApiStatus(this);
    },
});

// Functions
function getApiStatus(vueObj) {
    vueObj.loadButtonStatus = "loading";
    axios(apiInfo)
        .then(function (response) {
            vueObj.servicesList = response.data;
            toastr.success("Loaded status");
            loadedSuccessfully(vueObj);
        })
        .catch(function (error) {
            vueObj.checkApiAlive = false;
            toastr.error(error);
            toastr.error("Unable to get status!");
            loadedFailed(vueObj);
        })
        .then(function () {
            vueObj.isLoading = false;
            vueObj.responseTime = getTime();
        });
};

function refreshApiStatus(vueObj) {
    vueObj.loadButtonStatus = "loading";
    axios(apiInfo)
        .then(function (response) {
            vueObj.servicesList = response.data;
            toastr.success(`Refreshed status at ${getTime()}`);
            loadedSuccessfully(vueObj);
        })
        .catch(function (error) {
            toastr.error(error);
            toastr.error("Unable to refresh status!");
            loadedFailed(vueObj);
        })
        .then(function () {
            vueObj.responseTime = getTime();
        });
};

function configToastr() {
    toastr.options = {
        positionClass: "toast-bottom-right",
    };
};

function loadedSuccessfully(vueObj) {
    vueObj.checkApiAlive = true;
    vueObj.loadButtonStatus = "success";
    setTimeout(function () {
        vueObj.loadButtonStatus = "wait";
    }, loadedDelayTime);
};

function loadedFailed(vueObj) {
    vueObj.checkApiAlive = false;
    vueObj.loadButtonStatus = "failure";
    setTimeout(function () {
        vueObj.loadButtonStatus = "wait";
    }, loadedDelayTime);
};

function getTime() {
    return new Date().Format("yyyy-MM-dd hh:mm:ss");
};
