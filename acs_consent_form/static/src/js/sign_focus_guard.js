odoo.define('acs_consent_form.sign_focus_guard', function (require) {
    'use strict';

    var NameAndSignature;
    try {
        NameAndSignature = require('web.name_and_signature').NameAndSignature;
    } catch (error) {
        return;
    }

    if (!NameAndSignature || !NameAndSignature.include) {
        return;
    }

    NameAndSignature.include({
        /**
         * Guard against missing name inputs in customized portal signature dialogs.
         * Without this check, core code may call `.focus()` on `undefined`.
         */
        focusName: function () {
            var nameInput = this.el && this.el.querySelector
                ? this.el.querySelector('input[name="name"], input[name="partner_name"], .o_web_sign_name_input, #o_portal_sign_name')
                : null;

            if (!nameInput) {
                return;
            }

            if (typeof this._super === 'function') {
                try {
                    return this._super.apply(this, arguments);
                } catch (error) {
                    if (typeof nameInput.focus === 'function') {
                        nameInput.focus();
                    }
                }
                return;
            }

            if (typeof nameInput.focus === 'function') {
                nameInput.focus();
            }
        },
    });
});