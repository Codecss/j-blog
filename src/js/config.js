/**
 * Created by Ironman on 16/7/18.
 */
require.config({
    baseUrl: '/js/lib',
    paths: {
        jquery: 'jquery.min',
        bootstrap: 'bootstrap.min',
        gAlert: '../app/galert',
        gAjax: '../app/gajax'
    }
});
require(['jquery', 'bootstrap']);