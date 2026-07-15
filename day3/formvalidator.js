class FormValidator {
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
        const span = field.nextElementSibling;
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
                            "error: minimum length is" + fieldRules[fieldRule];
                        flag = 1;
                    }
                    break;
                }
                case "maxLength": {
                    if (fieldRules[fieldRule] < field.value.length) {
                        span.textContent =
                            "error: maximum length is" + fieldRules[fieldRule];
                        flag = 1;
                    }
                    break;
                }
                case "pattern": {
                    if (!fieldRules[fieldRule].test(field.value)) {
                        span.textContent = "error: pattern doesnt match";
                        flag = 1;
                    }
                }
                case "email": {
                    const pattern =
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;
                    if (!pattern.test(field.value)) {
                        //no email at all
                        if (field.value === "") break;
                        span.textContent = "error: email format is wrong";
                        flag = 1;
                    }
                    break;
                }
                case "match": {
                    const otherField = fieldRules[fieldRule];
                    const element = document.querySelector(
                        `[name="${otherField}"]`
                    );
                    console.log(element);
                    if (element.value !== field.value) {
                        span.textContent = "error: pattern not matching";
                        flag = 1;
                    }
                    break;
                }
                case "custom": {
                    if (!fieldRules[fieldRule].fn(field.value)) {
                        // alert();
                        span.textContent =
                            "error: doesnt match custom function";
                        flag = 1;
                    }
                    break;
                }
            }
        }
        if (flag === 1) {
            field.classList.add("is-invalid");
            field.classList.remove("is-valid");
            throw new Error("Invalid");
        } else {
            field.classList.add("is-valid");
            field.classList.remove("is-invalid");
            span.textContent = "";
        }
    }
    validateAll() {
        Object.keys(this.rules).forEach((key) => {
            // this.validate(this.form[key]);
            let field = this.form.querySelector(`#${key}`);
            if (field != null)
                this.validate(this.form.querySelector(`#${key}`));
        });
    }
}

module.exports = FormValidator;
