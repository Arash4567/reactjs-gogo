export default function refreshToken(response: any) {
  if (response.headers["x-new-token"]) {
      localStorage.setItem('token', JSON.stringify({'value': response.headers["x-new-token"]}))
  }
}