class Post {
  constructor(name, img) {
    this.name = name;
    this.date = new Date();
    this.img = img;
  }

  render() {
    const content = `
    <p>Hello, ${this.name}! Now is ${this.date}</p>
    <div><img src="${this.img}"</div>
    `;
    document.getElementsByTagName('body')[0].innerHTML = content;
  }
}

export default Post;
