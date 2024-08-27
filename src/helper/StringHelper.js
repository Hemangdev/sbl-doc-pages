import IndiaIpRange from "../constant/IndiaIpRanges.json";

const ucFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const strLimit = (string, limit = 10) => {
    if (string !== undefined && string.length > limit) {
        return string.substring(0, limit) + "...";
    }
    else {
        return string
    }
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(DATE) {
    var date = new Date(Date.parse(DATE));
    var h = date.getHours()
    var am_pm = "AM"

    if (date.getHours() > 12) {
        h = (date.getHours() - 12);
        am_pm = "PM";
    }

    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(h),
            padTo2Digits(date.getMinutes())
        ].join(':') +
        ' ' + am_pm
    );
}

function formatDateDDMMYYYY(d) {
    var date = new Date(d);

    if (isNaN(date.getTime())) {
        return d;
    }
    else {
        var month = [];
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        var day = date.getDate();

        if (day < 10) {
            day = "0" + day;
        }

        return day + " " + month[date.getMonth()] + ", " + date.getFullYear();
    }
}

function closeModal (selector = 'create') {
	const closeButton = document.querySelectorAll(`#${selector} .modal-close`)

	if (closeButton[0] instanceof HTMLElement) {
		closeButton[0]?.click()
	}
}

function nl2br(str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function makeid(length = 10) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function isEmailAddress(str) {
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return str.match(pattern);

}

const compairArray = (array_1, array_2) => {

    // console.log("array1", array_1);
    // console.log("array2", array_2);
    // if the other array is a falsy value, return
    if (!array_2)
        return false;

    // compare lengths - can save a lot of time 
    if (array_1.length !== array_2.length)
        return false;

    for (var i = 0, l = array_1.length; i < l; i++) {
        // Check if we have nested arrays
        if (array_1[i] instanceof Array && array_2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!array_1[i].equals(array_2[i]))
                return false;
        }
        else if (array_1[i] !== array_2[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

const substr_count = (str, search_substring) => {
    return str.split(search_substring).length - 1
}

const ip2long = ip_address => {
    // Converts a string containing an (IPv4) Internet Protocol dotted address into a proper address    
    //   
    // version: 901.714  
    // discuss at: http://phpjs.org/functions/ip2long  
    // +   original by: Waldo Malqui Silva  
    // +   improved by: Victor  
    // *     example 1: ip2long( '192.0.34.166' );  
    // *     returns 1: 3221234342  

    var output = false;
    var parts = [];
    if (ip_address.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
        parts = ip_address.split('.');
        output = (parts[0] * 16777216 +
            (parts[1] * 65536) +
            (parts[2] * 256) +
            (parts[3] * 1));
    }
    return output;
}

const long2ip = (ip) => {
    //  discuss at: https://locutus.io/php/long2ip/
    // original by: Waldo Malqui Silva (https://fayr.us/waldo/)
    //   example 1: long2ip( 3221234342 )
    //   returns 1: '192.0.34.166'
    if (!isFinite(ip)) {
        return false
    }
    return [ip > 24 & 0xFF, ip > 16 & 0xFF, ip > 8 & 0xFF, ip & 0xFF].join('.')
}

const netMatch = (network, ip) => {
    network = network.trim();
    ip = ip.trim();
    if (ip === network) {
        return true;
    }
    network = network.replace(' ', '');
    if (network.indexOf('*') !== false) {
        if (network.indexOf('/') !== false) {
            var asParts = network.split('/');
            network = asParts?.[0];
        }
        var nCount = substr_count(network, '*');
        network = network.replace('*', '0');
        if (nCount === 1) {
            network += '/24';
        } else if (nCount === 2) {
            network += '/16';
        } else if (nCount === 3) {
            network += '/8';
        } else if (nCount > 3) {
            return true; // if *.*.*.*, then all, so matched
        }
    }

    var d = network.indexOf('-');
    if (d === false) {
        var ip_arr = network.split('/');
        if (!ip_arr[0].preg_match("@d*.d*.d*.d*@")) {
            ip_arr[0] += ".0";    // Alternate form 194.1.4/24
        }
        var network_long = ip2long(ip_arr[0]);
        var x = ip2long(ip_arr[1]);
        var mask = long2ip(x) === ip_arr[1] ? x : (0xffffffff << (32 - ip_arr[1]));
        var ip_long = ip2long(ip);
        return (ip_long & mask) === (network_long & mask);
    } else {
        var from = ip2long(network.substr(0, d));
        var to = ip2long(network.substr(d + 1));
        ip = ip2long(ip);
        return (ip >= from && ip <= to);
    }
}

function checkIp(ip) {
    var output = false;
    IndiaIpRange.forEach((element) => {
        if (netMatch(element, ip)) { output = true }
    })
    return output
}

const debounceFunction = (func, delay) => {
    let timer;
    return function () {
        let self = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(self, args)
        }, delay)
    }
}

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export { ucFirst, alphabet, debounceFunction, checkIp, netMatch, strLimit, formatDate, nl2br, makeid, formatDateDDMMYYYY, compairArray, isEmailAddress, closeModal }