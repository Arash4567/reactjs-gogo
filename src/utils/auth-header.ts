export default function authHeader() {
  if (localStorage.getItem('token')) {
    let token: string = `${localStorage.getItem('token')}`;
    if (token)
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }