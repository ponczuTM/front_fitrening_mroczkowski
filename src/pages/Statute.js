import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Statute = () => {
    return (
        <React.Fragment>
            <Box
                component="div"
                noValidate
                sx={{
                    display: "flex",
                    minHeight: "90vh",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Link to="/">
                    <HomeIcon sx={{ color: "#3471eb", fontSize: 50 }} />
                </Link>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <hr width="40%" color="3471eb"></hr>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <div className="circle">
                    <MenuBookIcon className="circle-icon" />
                </div>

                <h1 style={{ color:'white'}}>Regulamin serwisu Fitrening</h1>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                
                <hr width="20%" color="3471eb"></hr><Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography variant="h5" component="h5" color="white">
                    Postanowienia ogólne
                </Typography>
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    <div className="centered_div">
                        <p>
                            Witaj w serwisie Fitrening! Jest to darmowy serwis,
                            w ramach którego użytkownicy mają dostęp do
                            statystyk związanych z uczestnikami projektu,
                            prowadzącymi i obiektami w nim udział biorących.
                            Niniejszy Regulamin określa zasady korzystania z
                            serwisu. Terminy „Serwis Fitrening” czy „serwis”
                            użyte w niniejszym Regulaminie oznaczają serwis
                            prowadzony przez Fitrening, pozwalający na
                            stworzenie kont dla osób biorących osób w projekcie,
                            wraz z dostępem do statystyk z tymi kontami
                            powiązanymi. Członkostwo w serwisie Fitrening jest
                            darmowe. W celu korzystania z serwisu Fitrening
                            użytkownik musi dysponować dostępem do Internetu
                            oraz Urządzeniem z obsługą platformy Fitrening,
                            korzystając z przeglądarki internetowej z włączoną
                            obsługą technologii JavaScript.
                        </p>
                    </div>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <hr width="20%" color="3471eb"></hr><Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography variant="h5" component="h5" color="white">
                    Metoda płatności
                </Typography>
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    <div className="centered_div">
                        <p>
                            Serwis Fitrening umożliwia zakup aplikacji na
                            wyłączność. W celu uzyskania szczegółowych
                            informacji użytkownik powinien skontaktować się z
                            właścicielem aplikacji za pomocą sekcji
                        </p>
                        <Link to="/purchase">kupno aplikacji</Link>
                    </div>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <hr width="20%" color="3471eb"></hr><Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography variant="h5" component="h5" color="white">
                    Rezygnacja
                </Typography>
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    <div className="centered_div">
                        <p>
                            Użytkownik może zrezygnować z członkostwa w serwisie
                            Fitrening w dowolnym momencie, poprzez porzucenie
                            konta.
                        </p>
                    </div>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <hr width="20%" color="3471eb"></hr><Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography variant="h5" component="h5" color="white">
                    Zmiany
                </Typography>
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    <div className="centered_div">
                        <p>
                            Serwis Fitrening może okresowo wprowadzać zmiany w
                            regulaminie, jednak wszelkie tego typu zmiany
                            obowiązywać będą nie wcześniej aniżeli 30 dni po
                            wysłaniu do użytkownika zawiadomienia pocztą
                            elektroniczną.
                        </p>
                    </div>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <hr width="20%" color="3471eb"></hr><Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography variant="h5" component="h5" color="white">
                    Serwis Fitrening
                </Typography>
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    <div className="centered_div">
                        <p>
                            Z serwisu Fitrening może korzystać wyłącznie
                            użytkownik, który ukończył 18 lat lub jest
                            pełnoletni w świetle prawa obowiązującego wmiejscu
                            zamieszkania. Osoby niepełnoletnie mogą korzystać z
                            serwisu tylko pod nadzorem dorosłych. Serwis
                            Fitrening oraz wszelkie treści oglądane przy jego
                            użyciu przeznaczone są do dowolnego użytku, w tym
                            komercyjnego. Wokresie członkostwa Fitrening udziela
                            użytkownikowi ograniczonej i niezbywalnej licencji
                            na dostęp do serwisu Fitrening Użytkownik zobowiązuje
                            się korzystać z serwisu Fitrening, w tym ze
                            wszystkich związanych z nim usług i funkcji,
                            zgodniez obowiązującymi zasadami oraz przepisami
                            prawa, przestrzegając też innych obowiązujących
                            ograniczeń w zakresie korzystania z serwisu i jego
                            treści.
                        </p>
                    </div>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <hr width="20%" color="3471eb"></hr><Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography variant="h5" component="h5" color="white">
                    Hasła i dostęp do konta
                </Typography>
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    <div className="centered_div">
                        <p>
                            Użytkownik, który założył konto w serwisie Fitrening
                            będzie mieć dostęp do takiego konta i kontrolę nad
                            nim (Właściciel Konta). Aby zapewnić sobie kontrolę
                            nad kontem oraz zapobiec przejęciu konta przez
                            nieuprawnione osoby, Właściciel Konta nie powinien
                            nikomu ujawniać hasła. Jeżeli użytkownik zapomniał
                            hasła, należy skontaktować się z właścicielem
                            aplikacji.
                        </p>
                    </div>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <hr width="20%" color="3471eb"></hr><Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography variant="h5" component="h5" color="white">
                    Przypisy
                </Typography>
                    <Typography sx={{ marginTop: "30px" }}></Typography>
                    <div className="centered_div">
                        <p>
                            Strona główna została zaprojektowana przy inspiracji
                            poradnika "React Website using Styled Components and
                            Smooth Scroll - Beginner Project Fully Responsive"
                            autorstwa Brian Design, dostępny jest na platformie
                            YouTube pod adresem:
                        </p>
                        <Link
                            to="//www.youtube.com/watch?v=Nl54MJDR2p8"
                            target="_blank"
                        >
                            https://www.youtube.com/watch?v=Nl54MJDR2p8
                        </Link>
                        <p>
                            Oryginał wideo, które znajduje się na tle strony
                            głównej aplikacji dostępny jest na platformie
                            YouTube pod adresem:
                        </p>
                        <Link
                            to="//www.youtube.com/watch?v=H3CfbtTjBnM"
                            target="_blank"
                        >
                            https://www.youtube.com/watch?v=H3CfbtTjBnM
                        </Link>
                    </div>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
                <Typography sx={{ marginTop: "30px" }}></Typography>
            </Box>
        </React.Fragment>
    );
};

export default Statute;