/**
 * For HTML5 Javascript API refer to http://html5index.org
 * For API specifications refer to https://developer.mozilla.org/en-US/docs/Web/API
 * For recipes and expert blogs on HTML5 refer to http://www.html5rocks.com/en/
 */
// Declare your application javascript as an IIFE - Immediately Invoked Function Expression, 
// a design patterns used to place all code within a local scope.
(function () {
    // DOM elements are ready for JS to be applied
    $(document).ready(function () {
        // Selector API
        var blueNav = document.querySelector('li.navLink > a')
        console.log('blueNav is: ',blueNav);
        blueNav.setAttribute('style','text-decoration: underline;');
        var allNavs = document.querySelectorAll('li.navLink > a');
        for (index = 0; index < allNavs.length; index++) {
            var navStyles = allNavs[index].getAttribute('style');
            console.log('Nav styles are: ', navStyles);
            allNavs[index].setAttribute('style','text-decoration: underline;'); 
        }
        //File API
        // var selectedFile = document.getElementById('input').files[0];
        var selectedFile = null;
        getFile = function() {
            selectedFile = $('#input')[0].files[0]; // Could also be var selectedFile = $('#input').get(0).files[0]; 
            console.log('Selected File:', selectedFile);
        }
        getImageFromFile = function(fileBlob) {
            //Process File Blob
        }
        handleFiles = function() {
            var filesList = this.files;
            console.log('Files List',filesList);
        }
        //Beautified file select elements
        var fileSelect = document.getElementById("fileSelect"),
            fileElem = document.getElementById("fileElem");

        fileSelect.addEventListener("click", function (e) {
            if (fileElem) {
                fileElem.click();
            }
            e.preventDefault(); // prevent navigation to "#"
        }, false);
        //Forms API


        //FileSystem API


        //IndexedDB



        //Web Storage
    });
    // DOM elements and content are loaded for display
    $(window).load(function () {
        //Canvas API
        setTimeout(function () {
            var canvas = document.getElementById("aCanvas");
            var ctx = canvas.getContext("2d");
            var img = document.getElementById("scream");
            ctx.drawImage(img, 10, 10);
        }, 300)
    });
    // window.onload = function () {
    // };



})()