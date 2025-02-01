import React, { useEffect, useState } from 'react';
import { WobbleCard } from './wobble-card';

const Mansorygrid = ({ name, website, builder, image, setLength, length }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setPreviewImage('');

    try {
      console.log("i am going to fetch images");
      const response = await fetch('/api/scrapePreview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website }),
      });

      if (response.ok) {
        const result = await response.json();
        setPreviewImage(result.imageUrl);  // Set the image URL to state
        setLength(prev => true);
      } else {
        console.log('Error fetching previewww');
        setLength(prev => false);
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Error fetching preview');
      setLength(prev => false);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (website) {
      handleSubmit(); 
    }
  }, [website]);

  const color = ["bg-cyan-700", "bg-purple-700", "bg-sky-600", "bg-stone-400", "bg-slate-400", "bg-indigo-800"]

  // bg-cyan-700 bg-purple-700
// bg-slate-400 bg-stone-400 bg-sky-600
  return (
    <WobbleCard containerClassName={'w-full h-full'} className={`${previewImage ? "min-h-[30vh]" : "min-h-[20vh]"} ${color[Math.floor(Math.random() * 7)]} w-full`}>
      <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">
        {name}
      </h2>
      {loading && <p className='text-sm'>Loading preview...</p>}
      {previewImage && (
        <div className='absolute -right-1 -bottom-8 rounded-md w-[15vw] h-48 overflow-hidden'>
          <img src={previewImage} alt="Website Preview" className="object-cover w-full h-full" />
        </div>
      )}
    </WobbleCard>
  );
}

export default Mansorygrid;
