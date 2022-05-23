import React from "react";

function Response(props) {
  return (
    <div className="note">
      <h5>{props.content.prompt}</h5>
      <p>{props.content.response}</p>
    </div>
  );
}

export default Response;
