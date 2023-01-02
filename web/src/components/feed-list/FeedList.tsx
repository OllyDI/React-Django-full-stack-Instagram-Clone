// react modules
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// services
import { FeedService } from '../../services/FeedService';

// models
import { FeedState, Feed } from '../../models/feed';

// components
import FeedItem from './FeedItem';

// Styles
import './FeedList.css';

const FeedList = () => {
  const feeds = useSelector((state: { FeedState: FeedState }) => state.FeedState.feeds);
  const dispatch = useDispatch();
  

  useEffect(()=>{
    console.log(FeedService.list());
    dispatch<any>(FeedService.list());
  }, []);

  return (
    <div className="feeds">
      {
        feeds.items.map((feed: Feed) => <FeedItem feed={feeds} />)
      }
    </div>
  );
}

export default FeedList;