import React from "react";
import {
	FooterContainer,
	FooterWrap,
	FooterLinksContainer,
	FooterLinksWrapper,
	FooterLinkItems,
	FooterLinkTitle,
	FooterLink,
	SocialMedia,
	SocialMediaWrap,
	SocialLogo,
} from "./FooterElements";

import { animateScroll as scroll } from "react-scroll";
const Footer = () => {
	const toggleHome = () => {
		scroll.scrollToTop();
	};
	return (
		<FooterContainer>
			<FooterWrap>
				<FooterLinksContainer>
					<FooterLinksWrapper>
						<FooterLinkItems>
							<FooterLinkTitle>Social Media</FooterLinkTitle>
							<FooterLink to="//facebook.com/ponczutm" target="_blank">Facebook</FooterLink>
							<FooterLink to="//www.instagram.com/ponczutm/" target="_blank">Instagram</FooterLink>
							<FooterLink to="//join.skype.com/invite/cKOAk1bL6q7q" target="_blank">Skype</FooterLink>
							<FooterLink to="//discord.com/app" target="_blank">ponczuTM#7162</FooterLink>
						</FooterLinkItems>
					</FooterLinksWrapper>
					<FooterLinksWrapper>
						<FooterLinkItems>
							<FooterLinkTitle>Kontakt</FooterLinkTitle>
							<FooterLink to="//gmail.com" target="_blank">mroczkowskioliwer10@gmail.com</FooterLink>
							<FooterLink to="//www.umk.pl" target="_blank">304732@stud.umk.pl</FooterLink>
							<FooterLink to="//www.mat.umk.pl" target="_blank">mroczkowskioli@mat.umk.pl</FooterLink>
							<FooterLink to="//www.kto-dzwonil.com/numer-telefonu/511535814" target="_blank">nr. tel.: 511535814</FooterLink>
						</FooterLinkItems>
					</FooterLinksWrapper>
				</FooterLinksContainer>
				<SocialMedia>
					<SocialMediaWrap>
						<SocialLogo to="/" onClick={toggleHome}>
							Fitrening {new Date().getFullYear()}
						</SocialLogo>
						<SocialLogo to="/statute" >
							Regulamin
						</SocialLogo>
					</SocialMediaWrap>
				</SocialMedia>
			</FooterWrap>
		</FooterContainer>
	);
};

export default Footer;