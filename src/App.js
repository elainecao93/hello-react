import React from 'react';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({value: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({value: ""});
  }

  render() {
    return <form>
        <input type="textarea" value={this.state.value} id="post" name="post" onChange={this.onChange}></input>
        <br></br>
        <input type="submit" value="Submit" onClick={this.onSubmit}/>
        Length: {this.state.value.length}
    </form>
  }
}

class History extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    this.props.deletePost(id);
  }

  render() {
    const items = this.props.posts.map((post, index) =>
      <Post post={post} id={index} onDelete = {this.onDelete}/>
    );
    return <ul>{items}</ul>;
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {post: props.post, id: props.id};
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() { 
    this.props.onDelete(this.props.id)
  }

  render() {
    return <li>
      {this.state.post}
      <input type="submit" value="Delete" onClick = {this.onDelete}/>
    </li>
  }
}

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.state = {posts: []};
  }

  onSubmit(value) {
    const p = this.state.posts;
    this.setState({posts: p.slice().concat([value])});
    alert(value);
    alert(this.state.posts.length)
  }

  deletePost(id) {
    alert("delete button clicked for " + id);
    const p = this.state.posts;
    this.setState({posts: p.slice().splice(id, 1)})
  }

  render() {
    return (
      <div>
        <Entry onSubmit = {this.onSubmit}/>
        <History posts = {this.state.posts} deletePost = {this.deletePost}/>
      </div>
    );
  }

}

function App() {
  return (
    <div className="App">
      <Blog/>
    </div>
  );
}

export default App;
