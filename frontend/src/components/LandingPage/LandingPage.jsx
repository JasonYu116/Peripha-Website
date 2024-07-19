import React, { useState }from "react";
import Hero from '../LandingPage/Hero'
import Navbar from '../Navbar'


function LandingPage() {
    const [addModal, setAddModal] = useState(false);
    const toggleAddModal = () => {
        setAddModal(!addModal)
    }

    
    
    return (
        <div className="">
            <Navbar/>
            <Hero/>
            <h1 className="text-white text-3xl w-full py-2 m-0 translate-x-[16px]">Trending</h1>
            <a href="/products/66394ee41bea3e470223e40b">
                <button onClick={toggleAddModal} className=" text-white w-60 h-96 px-2 bg-cyan-800 hover:bg-cyan-900 hover:shadow-cyan-800 text-lg rounded-md align-top shadow-lg shadow-cyan-700 ml-8 mb-8">
                    <img src="https://img.overclockers.co.uk/images/PER-EGG-01650/a6ccf9c4cc0b3c6abe9e7561c2d35cf2.jpg" className="align-top"/>
                    <h1 className="text-xl text-balanced content-start">EndgameGear OP1 8k</h1>    
                </button>
            </a>
            <a href="/products/66394d41c36e0f2c30dd4a19">
                <button onClick={toggleAddModal} className=" text-white w-60 h-96 px-2 bg-cyan-800 hover:bg-cyan-900 hover:shadow-cyan-800 text-lg rounded-md align-top shadow-lg shadow-cyan-700 ml-8 mb-8">
                    <img src="https://wraithesports.com/cdn/shop/files/SaturnProBlack.png?v=1693473544&width=1024" className="align-top"/>
                    <h1 className="text-xl text-balanced content-start">Lethal Gaming Gear Saturn Pro</h1>    
                </button>
            </a>
            <a href="/products/664abacbf62516162c1fecd8">
                <button onClick={toggleAddModal} className=" text-white w-60 h-96 px-2 bg-cyan-800 hover:bg-cyan-900 hover:shadow-cyan-800 text-lg rounded-md align-top shadow-lg shadow-cyan-700 ml-8 mb-8">
                    <img src="https://www.ashkeebs.com/wp-content/uploads/2021/03/WILBA_TECH-SALVATION-COLOR_03-SAMUARI_BLUE-min-scaled.jpg" className="align-top"/>
                    <h1 className="text-xl text-balanced content-start pt-12">Salvation60</h1>    
                </button>
            </a>
            <a href="/products/66601643dfda18db870bb2a7">
                <button onClick={toggleAddModal} className=" text-white w-60 h-96 px-2 bg-cyan-800 hover:bg-cyan-900 hover:shadow-cyan-800 text-lg rounded-md align-top shadow-lg shadow-cyan-700 ml-8 mb-8">
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.novatech.co.uk%2Fducky-dkon2187-pukpdmaeggc1_extra1.jpg&f=1&nofb=1&ipt=49a723e0d05c73e517d03681cee6ffb438e79688c7a42b946f23dea4733c4dbf&ipo=images" className="align-top"/>
                    <h1 className="text-xl text-balanced content-start pt-12">Ducky One 3</h1>    
                </button>
            </a>
           
            
            <h1 className="text-white text-3xl w-full py-2 m-0 translate-x-[16px]">Popular Users</h1>
            <a href="/user/casbin">
                <button onClick={toggleAddModal} className=" text-white w-60 h-96 px-2 bg-cyan-800 hover:bg-cyan-900 hover:shadow-cyan-800 text-lg rounded-md align-top shadow-lg shadow-cyan-700 ml-8 mb-8">
                    <img src="https://pbs.twimg.com/profile_images/1744313696330125312/8AZk81oE_400x400.jpg" className="align-top rounded-md"/>
                    <h1 className="text-xl text-balanced content-start pt-3">Casbin</h1>    
                </button>
            </a>
            <a href="/user/CloserSpore">
                <button onClick={toggleAddModal} className=" text-white w-60 h-96 px-2 bg-cyan-800 hover:bg-cyan-900 hover:shadow-cyan-800 text-lg rounded-md align-top shadow-lg shadow-cyan-700 ml-8 mb-8">
                    <img src="https://media.discordapp.net/attachments/1227405459951059049/1247836541225533552/dudududududududududu.png?ex=666179d7&is=66602857&hm=8af288d7375549a2a983e94e976b3ce9229ad1e35921e406e3ed3d250dd3ebe7&=&format=webp&quality=lossless" className="align-top rounded-md"/>
                    <h1 className="text-xl text-balanced content-start pt-3">CloserSpore</h1>    
                </button>
            </a>
            <a href="/user/jack">
                <button onClick={toggleAddModal} className=" text-white w-60 h-96 px-2 bg-cyan-800 hover:bg-cyan-900 hover:shadow-cyan-800 text-lg rounded-md align-top shadow-lg shadow-cyan-700 ml-8 mb-8">
                    <img src="https://static.wixstatic.com/media/5c9ff7_a321cf319353487598e6d080a535a343~mv2.png/v1/fit/w_500,h_500,q_90/file.png" className="align-top rounded-md"/>
                    <h1 className="text-xl text-balanced content-start pt-3">Jack</h1>    
                </button>
            </a>
            <a href="/user/jaleyu">
                <button onClick={toggleAddModal} className=" text-white w-60 h-96 px-2 bg-cyan-800 hover:bg-cyan-900 hover:shadow-cyan-800 text-lg rounded-md align-top shadow-lg shadow-cyan-700 ml-8 mb-8">
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.media.amplience.net%2Fi%2Fxcite%2F632179-03%3Fimg404%3Ddefault%26w%3D2048%26qlt%3D75%26fmt%3Dauto&f=1&nofb=1&ipt=c2ccf0c340dddcf2b083b751dff4a75ff807c07b5216bd4fddbbe79052f3d3b3&ipo=images" className="align-top rounded-md"/>
                    <h1 className="text-xl text-balanced content-start pt-3">Jaleyu</h1>    
                </button>
            </a>
        </div>
    );
}

export default LandingPage;