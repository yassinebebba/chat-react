const Auth = {
  force_logout(push)
  {
    localStorage.setItem('token', '');
    localStorage.setItem('is_authenticated', 'false');
    push('/login');
  }
}

export default Auth;
