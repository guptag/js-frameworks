angular.module('app.common.models')
       .factory('HeaderModel', function () {
    /**
     * [HeaderModel description]
     * @param {[type]} title    [description]
     * @param {[type]} subtitle [description]
     */
    function HeaderModel(title, subtitle) {
        this.title = title;
        this.subtitle = subtitle;
        this.isCollapsed = false;
    }

    /**
     * [collapse description]
     * @return {[type]} [description]
     */
    HeaderModel.prototype.collapse = function () {
        this.isCollapsed = true;
    }

    return HeaderModel;
});