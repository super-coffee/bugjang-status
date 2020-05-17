var baseStyle = "card text-white text-center m-2";
var bugjangStatus = new Vue({
    el: "#bugjangStatus",
    data: {
        servicesList: [],
        checkApiAlive: true,
        loading: true,
        styleMap: {
            red: `${baseStyle} bg-danger`,
            yellow: `${baseStyle} bg-warning`,
            green: `${baseStyle} bg-success`,
        },
    },
    created() {
        configToastr();
        getStatus();
    },
});

function getStatus () {
    axios({
        url: "https://status.mojang.com/check",
        method: "get",
    })
        .then(function (response) {
            bugjangStatus.servicesList = response.data;
            throw new Error("a error for debug, you can remove this");
            toastr.success("Loaded status");
        })
        .catch(function (error) {
            bugjangStatus.checkApiAlive = false;
            toastr.error("Unable to get status");
        })
        .then(function () {
            bugjangStatus.loading = false;
        });
}

function configToastr () {
    toastr.options = {
        positionClass: "toast-bottom-right",
    };
}
