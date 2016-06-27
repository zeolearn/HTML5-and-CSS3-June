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
        // console.log('blueNav is: ',blueNav);
        // blueNav.setAttribute('style','text-decoration: underline;');
        var allNavs = document.querySelectorAll('li.navLink > a');

        for (index = 0; index < allNavs.length; index++) {
            var navStyles = allNavs[index].getAttribute('style');
            console.log('Nav styles are: ', navStyles);
            allNavs[index].setAttribute('style', 'text-decoration: underline;');
        }

        //
        //File API
        //
        //
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
        /**
         * Handle Single-file Select
         */
        var selectedFile = null;
        handleSingleFile = function (event) {
            console.log('Single: ', event.target.files)
            selectedFile = $('#inputFile')[0].files[0]; // Could also be var selectedFile = $('#input').get(0).files[0]; 
            console.log('Selected File:', selectedFile);
        }
        getImageFromFile = function (fileBlob) {
            //Process File Blob
        }
        /**
         * Handle Multiple-files select 
         * */
        handleFiles = function (evt, files) {
            var filesList = files;
            console.log('Multi: ', filesList)
            var files = evt.target.files; // FileList object
            console.log('Files ', files, ' from event ', evt)

            // files is a FileList of File objects. List some properties.
            var output = [];
            for (var i = 0, f; f = files[i]; i++) {
                output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                    '</li>');
            }
            document.getElementById('mFiles').innerHTML = '<ul>' + output.join('') + '</ul>';

        }
        /**
         * Custom Styled file-select elements
         */
        var fileSelect = document.getElementById("fileSelect"),
            fileElem = document.getElementById("fileElem");

        fileSelect.addEventListener("click", function (e) {
            console.log('Event on Anchor Tag: ', e)
            if (fileElem) {
                fileElem.click();
            }
            e.preventDefault(); // prevent navigation to "#"
        }, false);

        handleFilesCustomElement = function (files) {
            var filesList = files;
            document.getElementById('fileNames').innerHTML = (function (fl) {
                if (fl) {
                    var keysList = Object.keys(fl);
                    var kl = keysList.length;
                    return kl > 0 ? (kl > 1 ? kl + ' files' : fl[kl - 1].name) : 'No files chosen';
                }
            })(filesList);
        }
        /**
         * Drag and drop file-select
         */
        function handleDragDropFileSelect(evt) {
            console.log('Event', evt)
            evt.stopPropagation();
            evt.preventDefault();

            var files = evt.dataTransfer.files; // FileList object.

            // files is a FileList of File objects. List some properties.
            var output = [];
            for (var i = 0, f; f = files[i]; i++) {
                // Only process image files.
                if (!f.type.match('image.*')) {
                    continue;
                }

                var reader = new FileReader();

                // Closure to capture the file information.
                reader.onload = (function (theFile) {
                    return function (e) {
                        // Render thumbnail.
                        var span = document.createElement('span');
                        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
                        document.getElementById('list').insertBefore(span, null);
                    };
                })(f);

                // Read in the image file as a data URL.
                reader.readAsDataURL(f);

                //Display file info in output field

                output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                    '</li>');
            }
            document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
        }

        function handleDragOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        }

        // Setup the dnd listeners.
        var dropZone = document.getElementById('drop_zone');
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleDragDropFileSelect, false);

        //Web Storage
        if (!window.localStorage) {
            alert('Your browser does not support localstorage')
        }
        else {
            var store = window.localStorage
            var testObj = {k1: 'Value1', k2: 'Value2'} //Create a JSON Object
            store.setItem('testObjKey', JSON.stringify(testObj)); //Convert the object to its String form and store it in localStorage
            console.log('dropzone to string ', dropZone.outerHTML)
            store.setItem('dropZone', dropZone.outerHTML); //
            if(store.getItem('testObjKey')) {
                var testObjFromLocalStorage = JSON.parse(store.getItem('testObjKey'));
                console.log('store item t_o ', testObjFromLocalStorage);
                var dropZoneFromLocalStorage = store.getItem('dropZone');
                console.log('store item d_z', dropZoneFromLocalStorage);
            }
        }
        /**
         * Forms API
         */

        //FileSystem API


        //IndexedDB



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