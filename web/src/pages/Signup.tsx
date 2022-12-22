// React modules
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
// Components
import SignupForm from "../components/signup-from/SignupForm";

function Signup() {
    const [ cookies ] = useCookies();
    const nav = useNavigate();

    // 쿠키 안에 csrftoken이 존재하면(로그인이 되어 있으면) 홈으로 진입
    useEffect(()=>{
        if(cookies.csrftoken) {
            nav('/', {replace: true});
        }
    });

    return (
        <div className="center">
            <SignupForm />
            <div className="center-item">
                이미 계정이 있으신가요? <Link className="sugnup-link noline-link" to="/signin">로그인</Link>
            </div>
        </div>
    )
}

export default Signup;