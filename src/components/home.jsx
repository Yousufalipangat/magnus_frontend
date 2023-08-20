
import { useEffect, useState } from "react";
import "../css/home.css";
import MenuItem from "./homeComp/menuItem";
import TopBar from "./homeComp/topBar";


import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../assets/supportFile";



function Home() {

  const navigate = useNavigate();
  const [sessionValidate,setSessionValidate] = useState(false); 
  useEffect( () => {
   axios.get(`${BASE_URL}/auth`,{withCredentials:true}).then(result => {

      console.log(result)

      if (result.data.valid) {
        setSessionValidate(true)
      } else {
        navigate('/');
        alert('Time limit exceeded, sign again/enable cookie to work properly')
      }

    })
  })


  const menu = [
    {
      header: "Home",
      headerIcon: "home",
      items: [],
      headerRoute: ''
    },
    {
      header: "Employee",
      headerIcon: "groups",
      items: [
        { name: "Create", link: "edit", route: 'employee/create' },
        { name: "Search", link: "search", route: 'employee/search' },
      ]
    },
    {
      header: "More",
      headerIcon: "widgets",
      items: [
        { name: "Multiple tabs", link: "hub", route: 'more/multiple-tab' },
        { name: "Menu", link: "hub", route: 'more/menu' },
        { name: "Autocomplete", link: "hub", route: 'more/autocomplete' },
        { name: "Collapse content", link: "hub", route: 'more/collapse-content' },
        { name: "Images", link: "hub", route: 'more/images' },
        { name: "Slider", link: "hub", route: 'more/slider' },
        { name: "Tooltips", link: "hub", route: 'more/tooltips' },
        { name: "Popups", link: "hub", route: 'more/popups' },
        { name: "Links", link: "hub", route: 'more/links' },
        { name: "CSS Propperties", link: "hub", route: 'more/css-properties' },
        { name: "iFrames", link: "hub", route: 'more/iframes' },
      ]
    },
    {
      header: "Settings",
      headerIcon: "settings",
      items: []
    }
  ];

  return (
      sessionValidate &&
    <div className="homeContainer">
      <TopBar />
      <div className="contentContainer">
        <aside>
          {menu.map((e, index) => {
            return (

              <MenuItem key={index}
                header={e.header}
                headerIcon={e.headerIcon}
                items={e.items}
                headerRoute={e.headerRoute}
              />
            );
          })}
        </aside>


        <Outlet />

      </div>
    </div>
  );
}

export default Home;
