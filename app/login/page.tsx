import React from 'react';

const Login = () => {
  return (
    <>
      <form>
        <div className="container">
          <input type="text" placeholder="Enter Username" name="uname" required />
          <input type="password" placeholder="Enter Password" name="psw" required />
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}

export default Login;
