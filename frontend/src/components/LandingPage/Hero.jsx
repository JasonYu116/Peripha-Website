import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

function Hero() {
    const slides = [
        {
            url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FdoTfGxNez5c%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=853548f3afd461b49d0359ec143a405dd48d6ee50a430cf56aa2c0b2e0b5cce5&ipo=images'
        },
        {
            url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthekeeblog.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fpedro-costa-aXY5doQNZTc-unsplash-scaled.jpg&f=1&nofb=1&ipt=fb1bcd0e6a5a94f851fd7b6b5a913967e426a9ab9f44c6fbd282bb90f5e534ca&ipo=images'
        },
        {
            url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkomponentenpc.com%2Fwp-content%2Fuploads%2F2021%2F01%2FFinalmouse-muss-sich-dem-Spiel-stellen-nachdem-er-sich-fuer.jpg&f=1&nofb=1&ipt=77083552fbf02be1ec985b3a8803aebafa7d75d86aa9cdf01c44667e35da777f&ipo=images'
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0)
    const prevSlide = () => {
        const isFirstSlide = currentIndex == 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex == slides.length-1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    return (
        <div className='w-[90%] max-w-[960px] h-[50vh] m-auto py-4 px-4 relative group'>
            <div style= {{backgroundImage: `url(${slides[currentIndex].url})`}}className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>
            <div className='hidden group-hover:block hover:bg-gray-800 absolute top-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30}/>
            </div>
            <div className='hidden group-hover:block hover:bg-gray-800 absolute top-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30}/>
            </div>
        </div>
    )
    
}
export default Hero;