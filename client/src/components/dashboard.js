import React from "react";
import { Item } from "./Item";
import auth from "../auth";
import { Redirect } from "react-router-dom";
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      item: [],
      isEdit: false,
      itemId: ""
    };
    this.postData = this.postData.bind(this);
    this.getData = this.getData.bind(this);
  }
  async deleteItem(e) {
    try {
      const blob = await fetch(`api/item/${e}`, {
        method: "delete",
        headers: {
          "content-type": "application/json",
          "x-auth-token": localStorage.token
        }
      });
      this.getData();
    } catch (e) {
      auth.signout(() => {
        this.setState({
          ...this.state,
          logout: true
        });
      });
    }
  }

  editData(e) {
    this.setState(current => {
      return {
        ...current,
        itemId: e._id,
        name: e.name,
        description: e.description,
        isEdit: true,
        logout: false
      };
    });
  }

  async postData() {
    if (this.state.isEdit) {
      try {
        const blob = await fetch(`api/item/${this.state.itemId}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            "x-auth-token": localStorage.token
          },
          body: JSON.stringify({
            name: this.state.name,
            description: this.state.description
          })
        });
        this.getData();
        this.setState(current => {
          return {
            ...current,
            isEdit: false,
            itemId: "",
            name: "",
            description: ""
          };
        });
      } catch (e) {
        auth.signout(() => {
          this.setState({
            ...this.state,
            logout: true
          });
        });
      }
    } else {
      try {
        const blob = await fetch("api/item", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-auth-token": localStorage.token
          },
          body: JSON.stringify({
            name: this.state.name,
            description: this.state.description
          })
        });
        this.getData();
      } catch (e) {
        auth.signout(() => {
          this.setState({
            ...this.state,
            logout: true
          });
        });
      }
    }
  }

  async getData() {
    try {
      console.log("tring");
      const blob = await fetch("api/item", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-auth-token": localStorage.token
        }
      });
      const response = await blob.json();
      this.setState(current => {
        return {
          ...current,
          item: response
        };
      });
    } catch (ex) {
      console.log("Catching");
      auth.signout(() => {
        this.setState({
          ...this.state,
          logout: true
        });
      });
    }
  }
  changeItemData = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(current => {
      return {
        ...current,
        [name]: value
      };
    });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    if (this.state.logout) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div className="form-group p-5">
          <input
            onChange={this.changeItemData}
            className="form-control"
            type="text"
            value={this.state.name}
            placeholder="Enter the product name"
            name="name"
            required={true}
          />
          <input
            onChange={this.changeItemData}
            className="form-control"
            type="text"
            value={this.state.description}
            placeholder="Enter the product description"
            name="description"
            required={true}
          />
          <button onClick={this.postData} className="btn btn-info">
            {this.state.isEdit ? "EDIT" : "SAVE"}
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product name</th>
              <th scope="col">Product Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.item.map(e => (
              <Item
                key={e._id}
                editData={this.editData.bind(this)}
                deleteItem={this.deleteItem.bind(this)}
                item={e}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
