import React, { Component } from "react";
import "./users.css";
class Users extends Component {
  state = {};
  render() {
    return this.props.usr.reverse().map((dat) => {
      if (dat.user != null) {
        return (
          <div className="userFrm">
            <img src={dat.user.profile_image_url} />
            <div className="dtails">
              <p>{"Name : " + dat.user.name}</p>
              {dat.user.location != "" ? (
                <p>{"location : " + dat.user.location}</p>
              ) : (
                ""
              )}
              <p>{"Tweet : " + dat.text}</p>
            </div>
          </div>
        );
      }
    });
  }
}

export default Users;
