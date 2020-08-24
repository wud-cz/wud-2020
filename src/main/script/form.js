var db = axios.create({
    baseURL: 'https://europe-west1-wud-2020-api.cloudfunctions.net/',
    timeout: 10000
});

var svg = {
    sending: '<svg viewBox="0 0 24 24" width="18"><style>#circle {transform-origin: center;animation: rotate 2s infinite;} @keyframes rotate {0% {transform: rotate(0deg);}100% {transform: rotate(360deg);}}</style><path id="circle" d="M 12,2 A 12, 12 0 0 0 2, 12 M 12,22 A 12,12 0 0 0 22,12"  stroke="#0b132b" stroke-width="4" fill="none" /></svg>',
    done: '<svg viewBox="0 0 24 24" width="20"><path d="M 2,12 L 8,22 L 22,2"  stroke="#0b132b" stroke-width="4" fill="none" /></svg>'
}

var RE_MAIL = /(?:[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+\.)*[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~]+@(?:[\u0000-\u0019\u0021-\uFFFF]+\.)*[\u0000-\u0019\u0021-\uFFFF]+/

var formHandler = {
    created: function () {
        this.form.hostname = window.location.hostname
    },
    data: {
        form: {
            email: '',
            hostname: null
        },
        label: 'Dejte mi vědět',
        error: null
    },
    methods: {
        submit: function () {
            var that = this;
            if (!RE_MAIL.test(this.form.email)) {
                that.error = "Zadejte prosím platný e-mail."
                return;
            }
            that.label = svg.sending + ' Dejte mi vědět';
            db.post('/zajemce', this.form)
                .then(function (response) {
                    that.label = svg.done + ' Dáme vědět';
                })
                .catch(function (error) {
                    that.label = 'Dejte mi vědět';
                    that.error = "Je nám líto, e-mail se nepodařilo uložit. Raději nás kontaktujte na <a href='mailto:info@wud.cz'>info@wud.cz</a>. Děkujeme."
                });
        }
    }
}


new Vue(formHandler).$mount('#form-kdy-kde')
new Vue(formHandler).$mount('#form-zajemce')
