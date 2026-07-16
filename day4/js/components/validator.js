export class FormValidator {
    constructor(form, rules) {
        this.form = form;
        this.rules = rules;
    }
    validate(field) {
        if (!this.rules[field.name]) {
            return;
        }
        const fieldRules = this.rules[field.name];
        let flag = 0;
        const span = field.nextElementSibling.nextElementSibling;
        for (let fieldRule in fieldRules) {
            switch (fieldRule) {
                case "required": {
                    if (fieldRules[fieldRule]) {
                        if (field.value.trim() === "") {
                            span.textContent =
                                "error: " + field.name + " field is required";
                            flag = 1;
                        }
                    }
                    break;
                }
                case "minLength": {
                    if (fieldRules[fieldRule] > field.value.length) {
                        span.textContent =
                            "minimum length is " + fieldRules[fieldRule];
                        flag = 1;
                    }
                    break;
                }
                case "maxLength": {
                    if (fieldRules[fieldRule] < field.value.length) {
                        span.textContent =
                            "maximum length is " + fieldRules[fieldRule];
                        flag = 1;
                    }
                    break;
                }
                case "pattern": {
                    if (!fieldRules[fieldRule].test(field.value)) {
                        span.textContent = "pattern doesnt match";
                        flag = 1;
                    }
                    break;
                }
                case "email": {
                    const pattern =
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;
                    if (!pattern.test(field.value)) {
                        span.textContent = "email format is wrong";
                        flag = 1;
                    }
                    break;
                }
                case "match": {
                    const otherField = fieldRules[fieldRule];
                    const element = document.querySelector(
                        `[name="${otherField}"]`
                    );
                    if (element.value !== field.value) {
                        span.textContent = "not matching";
                        flag = 1;
                    }
                    break;
                }
                case "custom": {
                    if (!fieldRules[fieldRule].fn(field.value)) {
                        span.textContent = "doesnt match custom function";
                        flag = 1;
                    }
                    break;
                }
            }
        }
        if (flag === 1) {
            field.classList.add("is-invalid");
            field.classList.remove("is-valid");
        } else {
            field.classList.add("is-valid");
            field.classList.remove("is-invalid");
            span.textContent = "";
        }

        return flag;
    }
    validateAll() {
        let flag = 0;
        Object.keys(this.rules).forEach((key) => {
            let value = this.validate(this.form[key]);
            if (value === 1) flag = 1;
        });

        return flag;
    }
}
export let rules = {
    name: { required: true, minLength: 2, maxLength: 10 },
    email: { required: true, email: true },
    phone: { required: false, pattern: /[0-9]{10}/ },
    message: { required: true, minLength: 20 },
};
