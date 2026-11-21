(function () {
    var KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    var TIME_LIMIT = 10000;   
    var FLASH_MS = 500;     // 😈 //

    var SECRETS = {
        'password one': 'images/fun-1.png',
        'password two': 'images/fun-2.png'
    };

    var overlay = document.getElementById('fun-overlay');
    var input = document.getElementById('fun-input');
    var flash = document.getElementById('fun');
    var presses = [];

    Object.keys(SECRETS).forEach(function (k) {
        new Image().src = SECRETS[k];
    });

    function openPopup() {
        overlay.classList.add('open');
        input.value = '';
        input.focus();
    }

    function closePopup() {
        overlay.classList.remove('open');
        input.blur();
    }

    function flashImage(src) {
        flash.src = src;
        flash.style.display = 'block';
        setTimeout(function () { flash.style.display = 'none'; }, FLASH_MS);
    }

    document.addEventListener('keydown', function (e) {
        if (overlay.classList.contains('open')) return;

        var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        presses.push({ key: key, time: Date.now() });
        if (presses.length > KONAMI.length) presses.shift();
        if (presses.length < KONAMI.length) return;

        var matches = presses.every(function (p, i) { return p.key === KONAMI[i]; });
        var fastEnough = presses[presses.length - 1].time - presses[0].time <= TIME_LIMIT;

        if (matches && fastEnough) {
            presses = [];
            openPopup();
        }
    });

   input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closePopup(); return; }
    if (e.key !== 'Enter') return;

    var entered = input.value.trim().toLowerCase();
    if (SECRETS.hasOwnProperty(entered)) {
        closePopup();
        flashImage(SECRETS[entered]);
    } else {
        input.value = '';      
    }
});

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closePopup();
    });
})();
