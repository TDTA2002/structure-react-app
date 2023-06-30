import React from "react";
import Img from "../../logo.svg";
import "./Loading.scss";

export default function Loading() {
  return (
    <div className="loading_container">
      <img className="rotating-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgwuQ8tY-I3zs2rBUAZ1yj-cuQoQJdAGuJNg&usqp=CAU" />
    </div>
  );
}
