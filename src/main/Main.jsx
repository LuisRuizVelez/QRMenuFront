import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";



import createService from "../connection/CreateService";
import {API_PATH_SECTION} from "../connection/apiPaths";


import '../css/Section.css'
import Loader from "../ui/Loader";
import {uiSetSelectedSection} from "../store/ui/uiThunks";
import {getCurrentEnvironment} from "../connection/apiConfig";

const Main = () => {
    const imagePath = getCurrentEnvironment() === 'production' ? '/menuqrfront/' : '/'
    const {username} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const sectionsService = createService(API_PATH_SECTION)


    const [loading, setLoading] = useState()
    const [sections, setSections] = useState([])


    useEffect(() => {
        getSections()
    }, [username]);


    const getSections =  () => {
        setLoading(true)

        sectionsService.getSectionByUser(username)
            .then(response => setSections(response))
            .catch(error => console.error("Error fetching sections:", error))
            .finally(() => setLoading(false))
    }

    const onClickSection = ({code}) => dispatch(uiSetSelectedSection(code))



    if(sections.length === 0)
        return <div className="container">
            <h1>No cuentas con acceso a las secciones.</h1>
        </div>





    return <>
        { loading && Loader() }
        <center>
            {
                sections.map((section, index) => <div
                    key={index}
                    className="section"
                    onClick={() => onClickSection(section)}
                >
                    <img src={`${imagePath}${section?.image}`} alt={section?.image}/>
                    <h2>{section?.name}</h2>
                </div>)
            }
        </center>
    </>
}

export default Main;