define([], function (undefined) {
    window.utils = {};
    utils.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    utils.animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    utils.transitionEndEvent = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

    Storage.prototype.getJSON = function (key) {
        return JSON.parse(sessionStorage.getItem(key));
    };

    Storage.prototype.set = function (key, value) {
        if (_.isObject(value)) {
            value = JSON.stringify(value);
        }
        sessionStorage.setItem(key, value);
    };

    utils.isSessionStorageSupported = function () {
        var mod = 'kool';
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    };

    if (utils.isSessionStorageSupported()) {
        utils.storage = sessionStorage;
    } else {
        utils.storage = { set: $.noop, getJSON: $.noop };
        alert("您的浏览器版本较旧, 请不要刷新。");
    }
    return utils;
});