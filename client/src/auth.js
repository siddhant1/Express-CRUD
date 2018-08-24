const auth = {
  isAuthenticated: false,
  authenticate(data, scb, fcb) {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.token);
        this.isAuthenticated = true;
        scb();
      })
      .catch(ex => {
        this.isAuthenticated = false;
        fcb();
      });
  },
  signout(cb) {
    localStorage.removeItem("token");
    this.isAuthenticated = false;
    cb();
  },
  checkSignIn(cb) {
    this.isAuthenticated = true;
    setTimeout(() => {
      cb();
    }, 4000);
  }
};
export default auth;
