import React, { Component } from "react";
import Modal from "./Modal";
import EmailSVG from "./icons/email.svg";
import SendMail from "../api/SendMail";
import Draggable from "react-draggable";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }
  state = {
    showModal: false,
    tasks: [],
    newtask: "",
    showMailModal: false,
    defaultCardPosition: { x: 0, y: 0 },
  };

  // Retrieve tasks & defaultCardPosition
  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      this.setState({ tasks });
    }
    const defaultCardPosition = JSON.parse(
      localStorage.getItem("cardPosition")
    );
    if (defaultCardPosition) {
      this.setState({ defaultCardPosition });
    }
  }

  componentDidUpdate() {
    const json = JSON.stringify(this.state.tasks);
    localStorage.setItem("tasks", json);
    // autofocus input for modal
    if (this.state.showModal || this.state.showMailModal) {
      setTimeout(() => this.inputRef.current.focus(), 1);
    }
    // Key Binding ctrl + enter :: exclusively for MailModal
    this.state.showMailModal
      ? document.removeEventListener("keydown", this.handleKeyDown)
      : document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 13) {
      this.toggleModal();
    }
  };

  // Modal: Add Task
  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  updateTask = () => {
    let newtask = document.getElementById("newtask").value;
    if (newtask) {
      this.setState({ tasks: [...this.state.tasks, newtask] });
    }
  };

  // Modal: Send Email
  toggleMailModal = () =>
    this.setState({ showMailModal: !this.state.showMailModal });

  sendMail = () => {
    let emailAddress = document.getElementById("recipientMail").value;
    SendMail(emailAddress, new Date().toDateString(), this.state.tasks);
  };

  // Strikethrough Todos: delay with promise to capture todos
  delay = (sec) => {
    return new Promise((resolve) => setTimeout(resolve, sec));
  };

  strikeThrough = (e) => {
    e.target.checked
      ? ((document.getElementById(e.target.value).style.textDecoration =
          "line-through"),
        this.delay(5000).then(() =>
          this.setState({
            tasks: this.state.tasks.filter((task) => task != e.target.value),
          })
        ))
      : (document.getElementById(e.target.value).style.textDecoration = "none");
  };

  // Update state and save card position in localStorage
  handleDraggable = (x, y) => {
    let defaultCardPosition = { x: x, y: y };
    this.setState({ defaultCardPosition });
    let pos = JSON.stringify({ x: x, y: y });
    window.localStorage.setItem("cardPosition", pos);
  };

  render() {
    const { showModal, tasks, showMailModal, defaultCardPosition } = this.state;
    return (
      <Draggable
        position={defaultCardPosition}
        onStop={(_, ui) => this.handleDraggable(ui.x, ui.y)}
      >
        <div className="card">
          <img
            onClick={() => this.toggleMailModal()}
            src={EmailSVG}
            className="emailIcon"
            alt="Mail Icon"
          />
          <form
            className="pa4"
            onSubmit={(e) => {
              e.preventDefault();
              this.toggleModal();
            }}
          >
            <div id="current_todos" className="bn">
              <h2>Things to do: </h2>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div className="flex items-center mb-2 eachTodo" key={task}>
                    <input
                      onChange={(e) => this.strikeThrough(e)}
                      type="checkbox"
                      value={task}
                      className="mr2"
                    />
                    <label htmlFor={task} id={task} className="lh-copy">
                      {task}
                    </label>
                  </div>
                ))
              ) : (
                <div>You're chillin</div>
              )}
              <button className="addTodo">Add New Task</button>
            </div>
          </form>
          {showModal ? (
            <Modal>
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.updateTask();
                    this.toggleModal();
                  }}
                  className="modalForm"
                >
                  <input
                    id="newtask"
                    type="input"
                    className="form_field"
                    placeholder="New Task"
                    autoComplete="off"
                    ref={this.inputRef}
                  />
                </form>
              </div>
            </Modal>
          ) : null}
          {showMailModal ? (
            <Modal>
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.sendMail();
                    this.toggleMailModal();
                  }}
                  className="modalForm"
                >
                  <input
                    id="recipientMail"
                    type="input"
                    className="form_field"
                    placeholder="Send to..."
                    autoComplete="off"
                    ref={this.inputRef}
                  />
                </form>
              </div>
            </Modal>
          ) : null}
        </div>
      </Draggable>
    );
  }
}

export default Todo;
