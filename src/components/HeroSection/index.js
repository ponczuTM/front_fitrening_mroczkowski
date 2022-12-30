import React from "react";
import Video from "../../videos/video.mp4";
import {
	HeroContainer,
	HeroBg,
	VideoBg,
	HeroContent,
	HeroH1,
	HeroP
} from "./HeroElements";

const HeroSection = () => {
	return (
		<>
		<HeroContainer id="home">
			<HeroBg>
				<VideoBg autoPlay loop muted src={Video} type="video/mp4"></VideoBg>
			</HeroBg>

			<HeroContent>
				<HeroH1>Dostęp do statystyk nigdy nie był tak prosty!<br></br><br></br>📊</HeroH1>
				<HeroP>
				Fitrening to aplikacja do zarządzania procesami analitycznymi uczestników 
				biorących udział w projekcie aktywności rekreacyjnej i sportowej 
				z podziałem na statystyki dostępne dla korzystającego, prowadzącego zajęcia oraz administratora
				</HeroP>
			</HeroContent>
		</HeroContainer>
		</>
	);
};

export default HeroSection;
