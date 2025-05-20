import AboutUs from "../../components/Guest/AboutUs";
import Footer from "../../components/Guest/Footer";
import HeroSection from "../../components/Guest/HeroSection";
import ProdukUnggulan from "../../components/Guest/ProdukUnggulan";
import Ulasan from "../../components/Guest/Ulasan";

export default function DashboardGuest(){
    return(
        <div>
            <HeroSection/>
            <AboutUs/>
            <ProdukUnggulan/>
            <Ulasan/>
            <Footer/>
        </div>
    )
}