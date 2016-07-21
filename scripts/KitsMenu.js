(function(KitsMenu){
    let ul = document.querySelector('.kit-select');
    
    KitsMenu.render = function(kits) {
        kits.forEach(kitName => {
            let li =
            `<li>
                <input name="kit" id="${kitName}-kit" type="radio" value="${capitalize.call(kitName)}">
                <label for="${kitName}-kit">${capitalize.call(kitName)} Kit</label>
            </li>`;

            ul.innerHTML += li;
        });

        return ul.getElementsByTagName('input');
    };
    
    function capitalize() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
})(window.KitsMenu = window.KitsMenu || {});