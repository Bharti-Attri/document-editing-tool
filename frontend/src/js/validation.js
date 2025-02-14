const disable = (submitButton) => {
    submitButton.disabled = true;
    submitButton.style.backgroundColor = '#1072659e';
}
const enable = (submitButton) => {
    submitButton.disabled = false;
    submitButton.style.backgroundColor = '#107265';
}
function showError(error,text) {
    error.textContent = text;
    error.classList.remove('hidden');
}
function hideError(error) {
    error.textContent = '';
    error.classList.add('hidden');
}
const validateUser = (userField, userError) => {
    const userValue = userField.value.trim();
    if (userValue.length<3) {
        if (userValue.length !== 0) {
        const text = 'Username must contain atleast 3 letters!';
        showError(userError,text);
        }else hideError(userError);
        return false;
    } else {
        hideError(userError);
        return true;
    }
};


const validatePassword = (passwordField, passwordError) => {
    const passwordValue = passwordField.value.trim();
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(passwordValue)) {
        if (passwordValue.length !== 0) {
            const text = 'Use a strong password!';
            showError(passwordError,text);
        }
        else hideError(passwordError)
        return false;
    } else {
        hideError(passwordError);
        return true;
    }
};
const confirmPassword = (password, confirmPassword, passwordError) => {
    if (confirmPassword !== password) {
        if (confirmPassword.length !== 0) {
            const text = 'Password Do not Match!';
            showError(passwordError,text);
        }else hideError(passwordError);
        return false;
    } else {
        hideError(passwordError);
        return true;
    }
};
const validate = (form) => {
    const passwordField = form.querySelector('input[type="password"]');
    const passwordError = form.querySelector('.password-error');
    const confPassword = form.querySelector('#confirmPass');
    const confPasswordError = form.querySelector('.conf-password-error');
    const user = form.querySelector('input[type="text"]');
    const userError = form.querySelector('.user-error');
    const btn = form.querySelector('button');
    let fields = [user, passwordField] ;
    if(confPassword) fields = [passwordField, confPassword, user];
    fields.forEach(field => {
        field.addEventListener('input', async() => {
            const isValidPassword = validatePassword(passwordField, passwordError);
            const isValidUser = validateUser(user, userError)
            let isValid = isValidUser && isValidPassword;
            if (confPassword) {
                const isConfirmed = confirmPassword(passwordField.value, confPassword.value, confPasswordError)
                isValid = isConfirmed && isValidPassword && isValidUser
            }
            (isValid) ? enable(btn): disable(btn);
        });
    })
}
export {validate,enable,disable}
