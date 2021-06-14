import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          allMemeImgs: response.data.memes,
        })
      );
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit (e) {
      e.preventDefault();
    const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    this.setState({randomImg: this.state.allMemeImgs[randomNum].url})
  }

  render() {
    return (
      <div>
        <form className="meme-form"  onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            onChange={this.handleChange}
            value={this.state.topText}
            placeholder="Top-Text"
          />
          <input
            type="text"
            name="bottomText"
            onChange={this.handleChange}
            value={this.state.bottomText}
            placeholder="Top-Text"
          />

          <button>Gen</button>
        </form>

        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
