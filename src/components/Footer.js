import React, { Fragment, useRef, useState } from 'react';

import { copyTextToClipboard } from '../lib/dom';
import { trackOutboundLink } from '../lib/google-analytics';

import './Footer.css';

import { ReactComponent as LinkedInIcon } from '../assets/images/icons/linkedin-brands.svg';
import { ReactComponent as GitHubIcon } from '../assets/images/icons/github-brands.svg';
import { ReactComponent as EnvelopeIcon } from '../assets/images/icons/envelope-regular.svg';

import FooterQuotes from './FooterQuotes';
import Tooltip from './Tooltip';

import { SOCIAL_LINKS } from '../constants';

function Footer() {
  return (
    <footer className="footer-main">
      <FooterQuotes />
      <ul className="social">
        {SOCIAL_LINKS.map(item => (
          <SocialItem key={item.name} social={item} />
        ))}
      </ul>
      <div className="credits">
        © Dominic Arrojado {new Date().getFullYear()}
      </div>
    </footer>
  );
}

function SocialItem({ social }) {
  const timeoutRef = useRef();
  const [showTooltip, setShowTooltip] = useState(false);
  let target = '_blank';
  let icon;
  let onClick = () => {};

  switch (social.name) {
    case 'linkedin':
      icon = (
        <Fragment>
          <LinkedInIcon />
          <Tooltip>{social.title}</Tooltip>
        </Fragment>
      );
      break;

    case 'github':
      icon = (
        <Fragment>
          <GitHubIcon />
          <Tooltip>{social.title}</Tooltip>
        </Fragment>
      );
      break;

    case 'email': {
      target = '_self';
      icon = (
        <Fragment>
          <EnvelopeIcon />
          <Tooltip isMounted={showTooltip}>
            {!showTooltip ? social.title : 'Copied!'}
          </Tooltip>
        </Fragment>
      );
      onClick = e => {
        const email = social.url.replace('mailto:', '');
        const copied = copyTextToClipboard(email);

        if (copied) {
          e.preventDefault();
          clearTimeout(timeoutRef.current);
          setShowTooltip(true);
        }
      };
      break;
    }

    default:
      icon = null;
  }

  return (
    <li>
      <a
        href={social.url}
        target={target}
        onClick={e => {
          trackOutboundLink(e);
          onClick(e);
        }}
        onMouseEnter={() => {
          clearTimeout(timeoutRef.current);
          setShowTooltip(false);
        }}
        onMouseLeave={() => {
          timeoutRef.current = setTimeout(() => setShowTooltip(false), 200);
        }}
        rel="noopener noreferrer"
      >
        {icon}
      </a>
    </li>
  );
}

export default Footer;
