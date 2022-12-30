import React from "react";
import Icon from "../../images/service.png";
import {
	ServicesContainer,
	ServicesH1,
	ServicesWrapper,
	ServicesCard,
	ServicesIcon,
	ServicesH2,
	Shopping,
} from "./ServicesElements";

const Services = () => {
	return (
		<ServicesContainer id="services">
			<ServicesH1>Usługi i płatność</ServicesH1>
			<ServicesWrapper>
				<ServicesCard>
					<ServicesIcon src={Icon} />
					<ServicesH2>Prowadzenie konta i administrowanie statystykami <br></br>jest bezpłatne, ale ograniczone</ServicesH2>
					<ServicesH2>1 konto administratorskie  ║  10 kont prowadzących  ║  100 kont uczestników</ServicesH2>
					<ServicesH2>Jeżeli chciałbyś korzystać z wszyskich kont bez ograniczeń - możesz zakupić aplikację</ServicesH2>
					<ServicesH2>Aby zakupić aplikację, przejdź do sekcji <Shopping to="/purchase">kupno aplikacji</Shopping></ServicesH2>
				</ServicesCard>
			</ServicesWrapper>
		</ServicesContainer>
	);
};

export default Services;
