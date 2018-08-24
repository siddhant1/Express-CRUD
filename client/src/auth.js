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
  checkSignIn(cb, fcb) {
    console.log("running");
    fetch("api/user/me", {
      headers: {
        "content-type": "application/json",
        "x-auth-token": localStorage.token
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log("here");
        this.isAuthenticated = true;
        cb();
      })
      .catch(err => {
        console.log("here in checksign in catch");
        this.isAuthenticated = false;
        fcb();
      });
  }
};
export default auth;
