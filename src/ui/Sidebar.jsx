import { NavLink } from 'react-router';
import {useSelector} from "react-redux";

// hooks
import useRoute from "../hooks/useRoute";

// styles
import '../css/Sidebar.css'; // Custom styles for the sidebar

const Sidebar = () => {
    const {selectedSection:code} = useSelector(state => state.ui);

    const [, routes] = useRoute(code); // Using the custom hook to get routes based on the selected section

    return <div className="bg-light sidebar vh-100">
        <ul className="nav flex-column">

            {
                routes.map((route, index) => <li key={index} className="nav-item">
                    <NavLink  to={route?.path} className="nav-link">{route?.name}</NavLink>
                </li>)
            }

        </ul>
    </div>
};

export default Sidebar;