import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SocialShare = (props) => {
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.origin);
    }, []);

    const encodedUrl = encodeURIComponent(`https://sblglobal.com`);
    // const encodedUrl = encodeURIComponent(`https://atlas0dev.wpengine.com/${props.slug}`);
    const encodedPostTitle = encodeURIComponent(props.title || '');

    const facebookBlackUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&postId=${encodedPostTitle}`;
    const twitterBlackUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&postId=${encodedPostTitle}`;
    const instagramShareUrl = `https://www.instagram.com/your-instagram-profile`; // Change this to your Instagram profile or post URL
    const linkedinBlackUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

    return (
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
    )
}

export default SocialShare;
