// Extension to Date, convert Date to String in specified format
// Month (M), day (d), hour (H), minute (m), second (s), quarter (q) can use 1-2 placeholders,
// Year (y) can use 1-4 placeholders, milliseconds (S) can only use 1 placeholder (is a 1-3 digit)
// 
// Example:
// (new Date ()). Format ("yyyy-MM-dd HH: mm: ss.S") ==> 2006-07-02 08: 09: 04.423
// (new Date ()). Format ("yyyy-M-d H: m: s.S") ==> 2006-7-2 8: 9: 4.18
// 
// author: meizz 
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    };
    return fmt;
};