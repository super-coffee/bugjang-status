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
    mounted() {
        axios({
            url: "https://status.mojang.com/check",
            method: "get",
        })
            .then(function (response) {
                bugjangStatus.servicesList = response.data;
            })
            .catch(function (error) {
                bugjangStatus.checkApiAlive = false;
            })
            .then(function () {
                bugjangStatus.loading = false;
            });
    },
});
