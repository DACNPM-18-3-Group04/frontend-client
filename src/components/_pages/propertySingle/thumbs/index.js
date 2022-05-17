import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Box } from '@mui/material';

export default function ThumbSlider({ sx, imgs }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box sx={{ ...sx }}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          height: 'inherit',
        }}
        spaceBetween={10}
        navigation={true}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        {imgs?.length > 0 ? (
          imgs.map((img) => (
            <SwiperSlide key={img.id}>
              <img alt={img.id} src={img.image_link} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              alt='not available'
              src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
            />
          </SwiperSlide>
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {imgs?.length > 0 ? (
          imgs.map((img) => (
            <SwiperSlide key={img.id}>
              <img alt={img.id} src={img.image_link} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img
              alt='not available'
              src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
            />
          </SwiperSlide>
        )}
      </Swiper>
    </Box>
  );
}
