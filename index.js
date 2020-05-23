// Settings
var baseStyle = "card text-white text-center m-2";
var apiInfo = {
    url: "https://status.mojang.com/check",
    method: "get",
};
var loadButtonStatusList = {
    waiting: "waiting",
    loading: "loading",
    success: "success",
    failed: "failed",
}
var loadedDelayTime = 1500;  // ms

// Vue app
var bugjangStatus = new Vue({
    el: "#bugjangStatus",
    data: {
        servicesList: [],
        checkApiAlive: true,
        isLoading: true,
        loadButtonStatus: loadButtonStatusList.loading,
        responseTime: null,
        styleClassMap: {
            card: {
                red: `${baseStyle} bg-danger`,
                yellow: `${baseStyle} bg-warning`,
                green: `${baseStyle} bg-success`,
            },
            loadButton: {
                waiting: "fa fa-refresh",
                loading: "fa fa-refresh fa-spin",
                success: "fa fa-check",
                failed: "fa fa-times",
            },
        },
    },
    computed: {
        disableLoadButton: function () {
            var status = this.loadButtonStatus;
            return status == loadButtonStatusList.loading || status == loadButtonStatusList.success;
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
    vueObj.loadButtonStatus = loadButtonStatusList.loading;
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
            vueObj.responseTime = getCurrentTime();
        });
};

function refreshApiStatus(vueObj) {
    vueObj.loadButtonStatus = loadButtonStatusList.loading;
    axios(apiInfo)
        .then(function (response) {
            vueObj.servicesList = response.data;
            toastr.success(`[${getCurrentTime()}] Refreshed status`);
            loadedSuccessfully(vueObj);
        })
        .catch(function (error) {
            toastr.error(error);
            toastr.error("Unable to refresh status!");
            loadedFailed(vueObj);
        })
        .then(function () {
            vueObj.responseTime = getCurrentTime();
        });
};

function configToastr() {
    toastr.options = {
        positionClass: "toast-bottom-right",
    };
};

function loadedSuccessfully(vueObj) {
    vueObj.checkApiAlive = true;
    vueObj.loadButtonStatus = loadButtonStatusList.success;
    setTimeout(function () {
        vueObj.loadButtonStatus = loadButtonStatusList.waiting;
    }, loadedDelayTime);
};

function loadedFailed(vueObj) {
    vueObj.checkApiAlive = false;
    vueObj.loadButtonStatus = loadButtonStatusList.failed;
    setTimeout(function () {
        vueObj.loadButtonStatus = loadButtonStatusList.waiting;
    }, loadedDelayTime);
};

function getCurrentTime() {
    // require formatTime.js
    var timeFormat = "yyyy-MM-dd hh:mm:ss";
    return new Date().Format(timeFormat);
};
