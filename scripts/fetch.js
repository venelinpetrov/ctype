(function(Resource) {
    'use strict'

    /**
     * @param {string} resName
     * @returns {Object.<Promise>}
     */
    Resource.fetch = function (resName) {
        let request = new Request(BASE_URL + resName, {
            headers: new Headers({
                'Content-Type': 'arraybuffer'
            })
        });

        return fetch(request)
        .then(res =>
            res.arrayBuffer())
        .catch(e =>
            console.warn(e)
        );
    }

    /**
     * @param {string} kitUrl - the audio kit folder
     * @param {Array.<string>} arr - the names of the files to be fetched
     * @returns {Object.<Promise>}
     */
    Resource.fetchAll = function(kitUrl, arr) {
        let resources = [];

        arr.forEach(resName => {
            resources.push(Resource.fetch(kitUrl + resName));
        })

        return Promise.all(resources);
    }
})(window.Resource = window.Resource || {});