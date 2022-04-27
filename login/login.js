import {
  login,
  storeAuthenticatedUserAsCookie,
  readAuthenticatedUserFromCookie
} from '../lib/auth.js';

document.querySelector('#login').addEventListener('click', tryLogin);

const user = readAuthenticatedUserFromCookie();
if(user.isAuthenticated) {
  window.location.href = '/';
}

async function tryLogin(event) {
  event.preventDefault();
  const username = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  try {
    const res = await login(username, password);
    storeAuthenticatedUserAsCookie(res);
    window.location.href = '/';
  } catch {
    document.querySelector('.login-error').classList.remove('hidden');
    setTimeout(() => {
      document.querySelector('.login-error').classList.add('hidden');
    }, 1000 * 5)
  }
}