import React from "react";
import { Link } from "react-router-dom";

export default function Balance<ReactNode>() {
  return (
    <React.Fragment>
      <div>
        Balance
        <Link to={"/"}>index</Link>
      </div>
    </React.Fragment>
  )
}