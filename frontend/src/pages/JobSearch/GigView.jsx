import '../styles/GigView.scss';
import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import ApplyModal from '../../components/JobSearch/ApplyModal';
import {UserContext} from '../../Providers/userProvider';

export default function LandingPage(props) {
  const {currentUser} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const {gig_id} = useParams();
  const [gigPosting, setGigPosting] = useState('');

  useEffect(() => {
    axios
      .get(`/api/gig_postings/${gig_id}`)
      .then(res => {
        console.log(res.data);
        setGigPosting(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const style = {
    width: 1 / 2,
    height: 1 / 2,
    display: 'flex',
    flexDirection: 'column',
    margin: '10% 0 0 25%',
    background: '#223d55',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '2rem',
  };
  console.log(gigPosting.gig_images);
  return (
    <div className="content-container">
      <div className="gig-content">
        <h1 id="gig-jobtitle">{gigPosting.job_title}</h1>
        <p>
          <em>Posted on January 30, 2022</em>
        </p>
        <div className="gig-img-container">
          {gigPosting &&
            gigPosting.gig_images.map((image, index) => (
              <img key={index} src={image.photo_url} className="gig-img" />
            ))}
        </div>
        <div id="gig-bottom-content">
          <h2 id="gig-desc-label">Description</h2>
          <p className="gig-desc">{gigPosting.description}</p>
          <p>
            <b>Offer: {`$${gigPosting.pay / 100} CAD`} </b>
          </p>
          <p>
            <b>
              Deadline:{' '}
              {new Date(gigPosting.deadline).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
            </b>
          </p>
          <ApplyModal currentUser={currentUser} jobApplying={gigPosting} />
        </div>
      </div>
    </div>
  );
}