/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

const Page = () => {
  const [url, setUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!url) return alert('Please enter a URL');

    setLoading(true);
    setPreviewImage('');

    try {
      const response = await fetch('/api/scrapePreview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        const result = await response.json();
        setPreviewImage(result.imageUrl);
      } else {
        alert('Error fetching preview');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching preview');
    }

    setLoading(false);
  };

  return (
    <div className='w-full h-screen text-black bg-white flex flex-col items-center justify-center'>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded w-96 text-white"
        />
        <Button type="submit" className="mt-2">Get Preview</Button>
      </form>

      {loading && <p>Loading...</p>}

      {previewImage && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Website Preview</h3>
          <img src={previewImage} alt="Website Preview" className="rounded border max-w-full" />
        </div>
      )}
    </div>
  );
};

export default Page;
