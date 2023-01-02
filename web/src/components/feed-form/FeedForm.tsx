// React
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// External
import { useDropzone } from 'react-dropzone';

// Models
import { UserState } from '../../models/user';
import { FeedState } from '../../models/feed';

// Components
import Slider from 'react-slick';

// Styles
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './FeedForm.css';
import { HideCreateFeedFormModal } from '../../reducers/FeedReducer';
import { FeedService } from '../../services/FeedService';

const FeedForm = () => {
    const settings = {
        dots: true, 
        arrows: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    const [ files, setFiles ] = useState([]);
    const [ inputStyle, setInputStyle ] = useState<string>(" image-input-default");
    const modal = useSelector((state: { FeedState: FeedState }) => state.FeedState.createFeedFormModal);
    const user = useSelector((state: {UserState: UserState}) => state.UserState.user);
    const { register, getValues } = useForm();
    const dispatch = useDispatch();

    const onDrop = (acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: File, index: number) => {
            return {
                key: index,
                file: URL.createObjectURL(file),
                fileObj: file
            }
        }));
    };
    const { getRootProps, getInputProps, open } = useDropzone({onDrop, accept: {'image/*': []}, noClick: true});

    useEffect(()=> {
        console.log(modal);
    }, [modal]);

    const hideModal = (event: any) => {
        if (event.target.id === 'feed-form-modal') {
            dispatch(HideCreateFeedFormModal());
            setFiles([]);
        }
    }

    const createFeed = () => {
        const description = getValues('description');
        console.log(files);
        console.log(description);
        const formData = new FormData;
        formData.append('description', description);
        files.forEach((file: {fileObj: Blob})=>{
            formData.append('images', file.fileObj);
        })

        dispatch<any>(FeedService.create(formData))
            .unwrap()
            .then(() => {
                dispatch(HideCreateFeedFormModal());
                setFiles([]);
                window.location.replace("/");
            })
            .catch((error: any)=>{
                // error handling
            })
    }

    return (
        <div id="feed-form-modal" className={modal ? "feed-form-modal-container feed-form-modal-show" : "feed-form-modal-container feed-form-modal-hide"} onClick={hideModal}>
            {files.length === 0 &&
                <div className="image-selector-modal">
                     <div className="feed-form-modal-title-container">
                        <div className="feed-form-modal-title">
                            <div className="feed-form-modal-title-side"></div>
                            <div>새 게시물</div>
                            <div className="feed-form-modal-title-side"></div>
                        </div>
                    </div>
                    <div className="feed-form-modal-content-container">
                        <div 
                            className={"image-input" + inputStyle} 
                            onDragOver = {() => setInputStyle(" image-input-drag")}
                            onDrag = {() => setInputStyle(" image-input-default")}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <span className="image-input-icon">
                                <img src="assets/icons/content.svg" alt="content"></img>
                            </span>
                            <div className="image-input-text">사진을 여기다 끌어다 놓으세요.</div>
                            <button className="image-input-btn" onClick={open}>컴퓨터에서 선택</button>
                        </div>
                    </div>
                </div>
            }
            {files.length !== 0 &&
                <div className="feed-form-detail-modal">
                    <div className="feed-form-modal-title-container">
                        <div className="feed-form-modal-title">
                            <div className="feed-form-modal-title-side" onClick={()=>setFiles([])}>이전</div>
                            <div>새 게시물</div>
                            <div className="feed-form-modal-title-side" onClick={createFeed}>다음</div>
                        </div>
                    </div>
                    <div className="feed-form-modal-content-container">
                        <div className="feed-form-detail">
                            <div className="feed-form-image-slider">
                                <Slider {...settings}>
                                    {
                                        files.map((file: any) => 
                                            <div key={file.key}>
                                                <img className="feed-form-slide-image" src={file.file} alt="slide" />
                                            </div>
                                        )
                                    }
                                </Slider>
                            </div>
                        </div>
                        <div className="feed-form-description">
                            <div className="feed-form-description-user">
                                <div className="feed-form-description-profile">
                                    <img className="feed-form-description-profile-image" src={user.profile ? user.profile : "profile.png"} alt="user profile" />
                                </div>
                                <div className="feed-form-description-username">{user.username}</div>
                            </div>
                            <div className="feed-form-description-input-container">
                                <textarea className="feed-form-description-input" {...register("description", {})} placeholder="문구 입력"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default FeedForm;