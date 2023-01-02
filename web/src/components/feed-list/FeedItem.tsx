// react modules
import { useEffect } from 'react';

// external modules
import Slider from 'react-slick';

const FeedItem = ({feed}: any) => {
	useEffect(() => {
		console.log(feed);
	}, []);

	const settings = {
		dots: true,
		arrows: true,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1
	}
	
	return (
		<div key={feed.pk} className="feed">
			<div className="feed-header">
				<div className="feed-header-content">
					<div className="feed-header-profile-containter">
						<img className="feed-header-profile" src={feed.user.profile ? feed.user.profile : "assets/profile.png"} alt="user profile" />
						<p className="feed-header-username" >{feed.user.username}</p>
					</div>
					<img src="assets/icons/more.svg" alt="menu icon"/>
				</div>
			</div>
			<div className="feed-content-image">
				<Slider {...settings}>
						{
						feed.images.map((image: string)=>{
							return (
								<div key={image}>
									<img className="feed-image" src={image} alt="slide" />
								</div>
							)
						})
					}
				</Slider>
			</div>
			<div className="feed-content">
				<div className="feed-content-icons">
					<span className="feed-content-icon">
						<img src="assets/icons/like-outlined.svg" alt="like icon" />
					</span>
					<span className="feed-content-icon">
						<img src="assets/icons/answer.svg" alt="answer icon" />
					</span>
					<span className="feed-content-icon">
						<img src="assets/icons/send-outlined.svg" alt="send icon" />
					</span>
					<span className="feed-content-icon-right">
						<img src="assets/icons/save-outlined.svg" alt="save icon" />
					</span>
				</div>
				<p className="feed-favorites">좋아요 {feed.like} 개</p>
				<p className="feed-descriotion"><span className="feed-username">{feed.user.username}</span>{feed.description}</p>
				<p className="feed-replies">댓글 7,519개 모두보기</p>
				<p className="feed-descriotion"><span className="feed-username">bts</span>greate.</p>
				<p className="feed-descriotion"><span className="feed-username">espa</span>good.</p>
				<p className="feed-time">2분 전</p>
				<div className="feed-comment-input-container">
					<span className="feed-comment-icon">
						<img src="assets\icons\emoticon.svg" alt="comment icon" />
					</span>
					<input className="feed-comment-input" type="text" placeholder="댓글 달기..." />
					<button className="feed-comment-btn">게시</button>
				</div>
			</div>
		</div>
	)
}

export default FeedItem;