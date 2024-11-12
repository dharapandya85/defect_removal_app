import {useEffect} from 'react';
import {useNavigate,useLocation,useParams} from 'react-router-dom';

const Scroll:React.FC= () => {
    const location = useLocation();  // This gives you the current location
    const navigate = useNavigate(); 
    useEffect(()=>{
       // const unlisten=history.listen(()=>{
            window.scrollTo(0,0);
        },[location]);
        
    return null;
};

export default Scroll;
