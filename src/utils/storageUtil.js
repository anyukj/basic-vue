const tokenName = 'Authorization';

// 设置token
export function setToken(value) {
  if (value) {
    sessionStorage.setItem(tokenName, value);
  } else {
    sessionStorage.removeItem(tokenName);
  }
}
export function getToken() {
  return sessionStorage.getItem(tokenName);
}
