// React modules
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, RegisterOptions } from 'react-hook-form';

// External modeuls
import axios from 'axios';

// Assets
import LockIcon from '../../icons/lock.svg';

const PasswordForm = () => {
    const emailOpts: RegisterOptions = {
        required: true,
        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    };
    const authcodeOpts: RegisterOptions = {
        required: true,
        pattern: /^.{6}$/
    }
    const passwordOpts: RegisterOptions = {
        minLength: 6,
        
    }

    const [ current, setCurrent ] = useState("email");
    const [ btnLabel, setBtnLabel ] = useState("인증코드 전송하기");
    const [ time, setTime ] = useState(299);
    const [ timeStr, setTimeStr ] = useState("5:00");
    const [ errorMsg, setErrorMsg ] = useState("");

    const { register, setValue, getValues, reset, formState: {errors, isDirty} } = useForm({ mode: 'onChange' });
    const nav = useNavigate();

    // 코드 마지막에 [] 대괄호를 넣으면 변경시마다 실행
    // 넣지 않으면 한번만 실행
    useEffect(() => {
        if (current === "authcode") {
            const timer = setInterval(() => {
                if (time > 0) { setTime(t => t-1); }
                if (time === 0) { clearInterval(timer); }
            }, 1000);
        }
    }, [current]);

    useEffect(() => {
        if (time >= 0) {
            let min = Math.floor(time / 60);
            let sec = time % 60;
            let str = `${min}:${sec.toString().padStart(2, '0')}`
            setTimeStr(str);
        }
    }, [time]);

    const handleInput = () => {
        let data = getValues();
        setErrorMsg("");

        if (current === 'email') {
            setValue('email', data.email, { shouldValidate: true, shouldDirty: true });
            console.log(errors);

            // ?는 데이터가 있을 때만 가져오고 없을 때는 가져오지 않음.
            if (errors?.email?.type === "required") setErrorMsg("이메일을 입력해 주세요.");
            else if (errors?.email?.type === "pattern") setErrorMsg("올바른 이메일 형식이 아닙니다.");
            else if (isDirty && (errors.email === undefined)) {
                axios.post('/users/authcode', data)
                .then((resp) => {
                    console.log(resp);
                    reset({...data}, {keepDirty: false});
                    setCurrent('authcode');
                    setBtnLabel('인증코드 확인하기');
                    window.alert(resp.data.authcode);
                })
                .catch((error) => {
                    console.log(error);
                    setErrorMsg(error.response.data.message);
                });
            }
        } else if (current === 'authcode') {
            setValue('authcode', data.authcode, { shouldValidate: true, shouldDirty: true });

            if (errors?.authcode?.type === 'pattern') setErrorMsg("인증 코드 형식에 맞지 않습니다.");
            else if (isDirty && (errors?.authcode == undefined)) {
                axios.put('/users/authcode', data)
                    .then((resp)=> {
                        reset({...data}, {keepDirty: false})
                        setCurrent('password');
                        setBtnLabel('비밀번호 변경하기');
                        setErrorMsg("");
                    })
                    .catch((error) => {
                        setErrorMsg(error.response.data.message);
                    });
            }

        } else if (current === 'password') {
            setValue('password', data.password, { shouldValidate: true, shouldDirty: true });

            if (errors?.password?.type === 'minLength') setErrorMsg("비밀번호 형식에 맞지 않습니다.");
            else if (isDirty && (errors.password == undefined)) {
                axios.put('/users/password', data)
                    .then((resp) => {
                        nav('/signin', {replace: true});
                    })
                    .catch((error) => {
                        setErrorMsg(error.response.data.message);
                    });
            }
        }
    }

    const toSignin = () => {
        nav('/signin');
    }

    return (
        <form className="password-form">
            <img className="form-content-icon" src={LockIcon} alt="lock.svg" />
            <div className="form-content-title">로그인에 문제가 있나요?</div>
            <div className="form-content-subtitle">이메일 주소, 전화번호 또는 사용자 이름을 입력하시면 계정에 다시 액세스할 수 있는 링크를 보내드립니다.</div>
            {
                current === "email" && 
                <input className="form-input" type="text" placeholder="이메일" {...register('email', emailOpts)} />
            }
            {
                current === "authcode" &&
                <div>
                    <input className="form-input" type="text" placeholder="인증코드" {...register('authcode', authcodeOpts)} />
                    <span className="form-expired">{timeStr}</span>
                </div>
            }
            {
                current === "password" &&
                <input className="form-input" type="password" placeholder="비밀번호" {...register('password', passwordOpts)} />
            }
            <button className="form-btn form-btn-blue" type='button' onClick={handleInput}>{btnLabel}</button>
            <Link className="signup-link  noline-link" to="/signup">새 계정 만들기</Link>
            { errorMsg !== "" && <div className='form-error'>{errorMsg}</div>}
            <button className="form-btn form-btn-bottom" onClick={toSignin}>로그인으로 돌아가기</button>
        </form>
    )
}

export default PasswordForm