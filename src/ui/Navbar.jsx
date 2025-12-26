import {useState, useEffect} from "react";
import {useNavigate, useLocation} from 'react-router';
import {useDispatch, useSelector} from "react-redux";


// components
import CustomSelect from "../components/CustomSelect";


// thunks
import {clearAuthentication, setSelectedGroupingRoleThunk, setGroupingRoleRequiredThunk} from "../store/auth/authThunks";
import {uiClearState, uiSetSelectedSectionThunk} from "../store/ui/uiThunks";

// paths
import {API_PATH_ROLE} from "../connection/apiPaths";
import {isGroupingRoleRequired} from "../utils/MapUtilities";


const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const userState = useSelector(state => state.auth);

    const [requiredGroupingRole, setRequiredGroupingRole] = useState(false);
    const [groupingRole, setGroupingRole] = useState(false);

    const { grouping_role } = userState;
    const showSelectedGroupingRole = !grouping_role && requiredGroupingRole;




    useEffect(() => {
        setRequiredGroupingRole(isGroupingRoleRequired(location?.pathname))
    }, [location?.pathname]);


    useEffect(() => {
        dispatch( setGroupingRoleRequiredThunk( showSelectedGroupingRole ) );
    }, [showSelectedGroupingRole, dispatch]);


    const onLogout = () => {
        dispatch( clearAuthentication() )
        dispatch( uiClearState() )
        navigate('/login',{ replace: true  });
    }

    const goHome = () => dispatch(uiSetSelectedSectionThunk())

    const onSelectGroupingRole = ( selectedRole ) => {
        setGroupingRole( selectedRole  );
        dispatch(setSelectedGroupingRoleThunk(selectedRole))
    }


    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
        <ul className="navbar-nav ml-auto">
            <button type={'button'} className={'nav-item nav-link btn'} onClick={goHome}>
                Home
            </button>
        </ul>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
            {
                showSelectedGroupingRole && <ul className="navbar-nav ml-auto select-container">
                    <CustomSelect
                        classValue={'select-item'}
                        initialValue={groupingRole}
                        servicePath={API_PATH_ROLE}
                        customFilter={{item: {isToGrouping: true}}}
                        onChange={onSelectGroupingRole}
                        placeholder={'Selecciona un Role...'}
                    />
                </ul>
            }

            <ul className="navbar-nav ml-auto">
                <button type={'button'} className={'nav-item nav-link btn'} onClick={onLogout}>
                    logout
                </button>
            </ul>
        </div>
    </nav>
}

export default Navbar;