import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
function List({ render, data }) {
  return <ul className="list">{data?.map(render)}</ul>;
}

export default List;
