import { useState } from "react";
import "../../css/menuItem.css";
import { NavLink } from "react-router-dom";

function MenuItem(props) {
  const [active, setActive] = useState(true);

  return (
    <div>
    {
      props.items.length > 0 ?
      <div className="menuItem" onClick={() => setActive((e) => !e)}>
        <div style={{ gap: '10px', display: "flex", alignItems: "center" }}>
          <span className="material-symbols-outlined">{props.headerIcon}</span>
          {props.header}
        </div>
        {
            active ? (
              <span className="material-symbols-outlined">chevron_left</span>
            ) : (
              <span className="material-symbols-outlined">expand_more</span>
            )
        }
      </div>:
      <NavLink className='navLink' to={props.headerRoute} >
      <div className="menuItem" >
        <div style={{ gap: '10px', display: "flex", alignItems: "center" }}>
          <span className="material-symbols-outlined">{props.headerIcon}</span>
          {props.header}
        </div>
      </div>
      </NavLink>
}


      {props.items.map((item,index) => {
        return (
          <NavLink className='navLink' to={item.route} key={index}>
            <div className="menuSubItem" hidden={active}>
              <span className="material-symbols-outlined">{item.link}</span> {item.name}
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}

export default MenuItem;
