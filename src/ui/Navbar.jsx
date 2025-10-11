import {useNavigate} from 'react-router';
import {useDispatch} from "react-redux";


// thunks
import {clearAuthentication} from "../store/auth/authThunks";
import {uiSetSelectedSectionThunk} from "../store/ui/uiThunks";


const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onLogout = () => {
        dispatch( clearAuthentication() )
        dispatch( uiSetSelectedSectionThunk() )
        navigate('/login',{ replace: true  });
    }

    const goHome = () => dispatch(uiSetSelectedSectionThunk())


    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
        <ul className="navbar-nav ml-auto">
            <button type={'button'} className={'nav-item nav-link btn'} onClick={goHome}>
                Home
            </button>
        </ul>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
            <ul className="navbar-nav ml-auto">
                <button type={'button'} className={'nav-item nav-link btn'} onClick={onLogout}>
                    logout
                </button>
            </ul>
        </div>
    </nav>
}

export default Navbar;