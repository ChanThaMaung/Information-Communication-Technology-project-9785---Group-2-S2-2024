import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";


export default function Home() {
    return (
        <>
            <Header />
            <div id="carouselExampleSlidesOnly" className="relative overflow-hidden">
                <div className="carousel-inner flex transition-transform duration-700">
                    <div className="carousel-item flex-none w-full active">
                        <img className="w-full" src="..." alt="First slide"/>
                    </div>
                    <div className="carousel-item flex-none w-full">
                        <img className="w-full" src="..." alt="Second slide"/>
                    </div>
                    <div className="carousel-item flex-none w-full">
                        <img className="w-full" src="..." alt="Third slide"/>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
