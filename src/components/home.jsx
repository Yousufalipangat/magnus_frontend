
import "../css/home.css";
import MenuItem from "./homeComp/menuItem";
import TopBar from "./homeComp/topBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";


function Home() {

    const [isAuth,setIsAuth] = useState(true);
    const navigate= useNavigate();

   const {state} = useLocation();
   useEffect(()=>{

    if(state){
        axios.post("https://magnus-backend-point.onrender.com/",{email:state.email,pass:state.pass}).then((res)=>{
        if(res.data)
        {
          setIsAuth(true)
        }
       }).catch((e)=>{
        alert('Session time out');
        navigate('/',{replace:true});
        
       })
    }else{
        console.log('no state')
        alert('Please sign in');
        navigate('/',{replace:true});
    }
   },[])
   
  const menu = [
    {
      header: "Home",
      headerIcon: "home",
      items: [],
      headerRoute:''
    },
    {
      header: "Employee",
      headerIcon: "groups",
      items: [
        { name: "Create", link: "edit" ,route:'employee/create'},
        { name: "Search", link: "search", route:'employee/search'},
      ]
    },
    {
      header: "More",
      headerIcon: "widgets",
      items: [
        { name: "Multiple tabs", link: "hub" ,route:'more/multiple-tab'},
        { name: "Menu", link: "hub", route:'more/menu' },
        { name: "Autocomplete", link: "hub" , route:'more/autocomplete'},
        { name: "Collapse content", link: "hub" , route:'more/collapse-content'},
        { name: "Images", link: "hub",route:'more/images' },
        { name: "Slider", link: "hub" , route:'more/slider'},
        { name: "Tooltips", link: "hub", route:'more/tooltips' },
        { name: "Popups", link: "hub", route:'more/popups' },
        { name: "Links", link: "hub" , route:'more/links'},
        { name: "CSS Propperties", link: "hub", route:'more/css-properties' },
        { name: "iFrames", link: "hub" , route:'more/iframes' },
      ]
    },
    {
      header: "Settings",
      headerIcon: "settings",
      items: []
    }
  ];

  return (
    isAuth &&
    <div className="homeContainer">
      <TopBar />
      <div className="contentContainer">
        <aside>
          {menu.map((e,index) => {
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
       
        
        <Outlet/>
        
      </div>
    </div>
  );
}

export default Home;
