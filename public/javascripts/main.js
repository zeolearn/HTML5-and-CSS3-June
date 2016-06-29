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
            var testObj = { k1: 'Value1', k2: 'Value2' } //Create a JSON Object
            store.setItem('testObjKey', JSON.stringify(testObj)); //Convert the object to its String form and store it in localStorage
            console.log('dropzone to string ', dropZone.outerHTML)
            store.setItem('dropZone', dropZone.outerHTML); //
            if (store.getItem('testObjKey')) {
                var testObjFromLocalStorage = JSON.parse(store.getItem('testObjKey'));
                console.log('store item t_o ', testObjFromLocalStorage);
                var dropZoneFromLocalStorage = store.getItem('dropZone');
                console.log('store item d_z', dropZoneFromLocalStorage);
            }
        }
        /**
         * IndexedDB
         * IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs. 
         * This API uses indexes to enable high performance searches of this data.
         * Refer: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
         * Demonstrated using jQueryUI autocomplete feature
         */
        $(document).ready(function () {
            console.log("Startup...");
            window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
            var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
            var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
            var db;
            var template;
            var openRequest = indexedDB.open("employees", 1);

            // Handle request for seed data
            function handleSeed() {
                // This is how we handle the initial data seed. Normally this would be via AJAX.

                db.transaction(["employee"], "readonly").objectStore("employee").count().onsuccess = function (e) {
                    var count = e.target.result;
                    if (count == 0) {
                        console.log("Need to generate fake data - stand by please...");
                        $("#status").text("Please stand by, loading in our initial data.");
                        var done = 0;
                        var employees = db.transaction(["employee"], "readwrite").objectStore("employee");
                        // Generate 1k people
                        for (var i = 0; i < 1000; i++) {
                            var person = generateFakePerson();
                            // Modify our data to add a searchable field
                            person.searchkey = person.lastname.toLowerCase();
                            resp = employees.add(person);
                            resp.onsuccess = function (e) {
                                done++;
                                if (done == 1000) {
                                    $("#name").removeAttr("disabled");
                                    $("#status").text("");
                                    setupAutoComplete();
                                } else if (done % 100 == 0) {
                                    $("#status").text("Approximately " + Math.floor(done / 10) + "% done.");
                                }
                            }
                        }
                    } else {
                        $("#name").removeAttr("disabled");
                        setupAutoComplete();
                    }
                };
            }

            // Autocomplete feature
            function setupAutoComplete() {
                $("#displayEmployee").hide();

                //Create the autocomplete
                $("#name").autocomplete({
                    source: function (request, response) {

                        console.log("Going to look for " + request.term);


                        var transaction = db.transaction(["employee"], "readonly");
                        var result = [];

                        transaction.oncomplete = function (event) {
                            response(result);
                        };

                        // TODO: Handle the error and return to it jQuery UI
                        var objectStore = transaction.objectStore("employee");

                        // Credit: http://stackoverflow.com/a/8961462/52160
                        var range = IDBKeyRange.bound(request.term.toLowerCase(), request.term.toLowerCase() + "z");
                        var index = objectStore.index("searchkey");

                        index.openCursor(range).onsuccess = function (event) {
                            var cursor = event.target.result;
                            if (cursor) {
                                result.push({
                                    value: cursor.value.lastname + ", " + cursor.value.firstname,
                                    person: cursor.value
                                });
                                cursor.continue();
                            }
                        };
                    },
                    minLength: 2,
                    select: function (event, ui) {
                        // $("#displayEmployee").show().html(template(ui.item.person)); //using handlebars.js
                        var htmlperson = "<label>" + ui.item.person.firstname + ' ' + ui.item.person.lastname + "</label>"
                        $("#displayEmployee").html(htmlperson);
                        $("#displayEmployee").show();
                    }
                });

            }
            // Handle setup.
            openRequest.onupgradeneeded = function (e) {

                console.log("running onupgradeneeded");
                var thisDb = e.target.result;

                // Create Employee
                if (!thisDb.objectStoreNames.contains("employee")) {
                    console.log("I need to make the employee objectstore");
                    var objectStore = thisDb.createObjectStore("employee", { keyPath: "id", autoIncrement: true });
                    objectStore.createIndex("searchkey", "searchkey", { unique: false });
                }

            };

            openRequest.onsuccess = function (e) {
                db = e.target.result;

                db.onerror = function (e) {
                    alert("Sorry, an unforseen error was thrown.");
                    console.log("***ERROR***");
                    console.dir(e.target);
                };

                handleSeed();
            };
        });

        /**
         * Web Workers API
         * Refer to inline script in index.html
         */

        /**
         * XMLHttpRequest
         */
        runXHR = function () {
            console.log('Start XHR')
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            function onError(e) {
                console.log('Window.FileSystem Error', e);
            }

            var xhr = new XMLHttpRequest();
            // xhr.setRequestHeader("Accept-Charset", "x-user-defined");
            xhr.overrideMimeType('text/plain; charset=x-user-defined');

            xhr.open('GET', '/images/khardung-la.jpg', true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function (e) {
                //Receiving response...
                console.log('XHR Receiving response...')
                var xhrResult = document.getElementById('xhrImageResult');
                var blob = new Blob([xhr.response], { type: 'image/jpg' });
                var imgUrl = window.URL.createObjectURL(blob);

                // xhrResult.innerHTML = '<img src="data:image/jpg;base64,' + imgUrl + '"/>';
                xhrResult.src = imgUrl;
                window.requestFileSystem(TEMPORARY, 1024 * 1024, function (fs) {
                    console.log('Filesystem root is: ', fs.root)
                    fs.root.getFile('kl.jpg', { create: true }, function (fileEntry) {
                        fileEntry.createWriter(function (writer) {
                            // Set up action to take in case of successful write
                            writer.onwrite = function (e) { console.log('File written to file system') };
                            // Set up action to take in case of write failure
                            writer.onerror = function (e) { console.log('Error writing file to file system') };
                            // Construct the blob object from the xhr response i.e. content of file received from the server
                            // write to file
                            writer.write(blob);

                        }, onError);
                    }, onError);
                }, onError);
            };

            xhr.send();
        }

        /**
         * Web Sockets API
         */

        /**
         * Forms API
         */

        /**
         * FileSystem API
         */






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