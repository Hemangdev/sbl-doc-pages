import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const SocialShare = (props) => {
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.href); // Using window.location.href to get the full URL
    }, []);

	console.log('currentUrl', currentUrl);
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedPostTitle = encodeURIComponent(props.title || '');

    const facebookBlackUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&postId=${encodedPostTitle}`;
    const twitterBlackUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedPostTitle}`;
    const instagramShareUrl = `https://www.instagram.com/your-instagram-profile`; // Change this to your Instagram profile or post URL
    const linkedinBlackUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

    return (
        <>
            <Helmet>
                <meta property="og:title" content={props.title} />
                <meta property="og:description" content={props.description} />
                <meta property="og:image" content="https://yourwebsite.com/path-to-image.jpg" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@your_twitter_handle" />
                <meta name="twitter:title" content={props.title} />
                <meta name="twitter:description" content={props.description} />
                <meta name="twitter:image" content="https://yourwebsite.com/path-to-image.jpg" />
                <meta name="twitter:url" content={currentUrl} />
            </Helmet>

            <div className={`collapse ${props?.show && 'show'}`} id="collapseSocialIcons">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a href={facebookBlackUrl} target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href={twitterBlackUrl} target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href={instagramShareUrl} target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href={linkedinBlackUrl} target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default SocialShare;
