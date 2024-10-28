import React, { useState } from 'react';
import ShortenedLinkOutput from './ShortenedLinkOutput';
import { QRCodeSVG } from 'qrcode.react';

import '../styles/LinkForm.css';

interface ShortenUrlResponse {
    short_url: string;
}

const URLForm: React.FC = () => {
    const [url, setUrl] = useState('');
    const [action, setAction] = useState<'shorten' | 'generateQR'>('shorten');
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (action === 'shorten') {
            // Simulate a URL shortening function
            // const generatedShortUrl =
            //     'https://short.ly/' + Math.random().toString(36).substr(2, 5);
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/generate-short-url`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            original_url: url,
                            user_id: 'e0dba740-fc4b-4977-872c-d360239e6b10',
                        }),
                    }
                );

                // if (!response.ok) {
                //     throw new Error('Failed to shorten URL');
                // }

                const data: ShortenUrlResponse = await response.json();
                setShortUrl(data.short_url);
            } catch (err) {
                setError(err.message);
                console.log(err);
            }
            setQrCodeUrl(null);
        } else if (action === 'generateQR') {
            setQrCodeUrl(url);
            setShortUrl(null);
        }
    };

    // onCopy function to copy the shortened URL
    const onCopy = () => {
        if (shortUrl) {
            navigator.clipboard
                .writeText(shortUrl)
                .then(() => {
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
                })
                .catch((error) => {
                    console.error('Failed to copy text:', error);
                });
        }
    };

    return (
        <div>
            <form
                className='link-form'
                onSubmit={handleSubmit}
            >
                <input
                    type='url'
                    className='link-input'
                    placeholder='Paste your URL here...'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />

                <div className='action-select'>
                    <input
                        id='shorten'
                        type='radio'
                        value='shorten'
                        checked={action === 'shorten'}
                        onChange={() => setAction('shorten')}
                    />
                    <label htmlFor='shorten'>Shorten Link</label>
                    <input
                        id='generateQR'
                        type='radio'
                        value='generateQR'
                        checked={action === 'generateQR'}
                        onChange={() => setAction('generateQR')}
                    />
                    <label htmlFor='generateQR'>Generate QR Code</label>
                </div>

                <button type='submit'>
                    {action === 'shorten' ? 'Shorten URL' : 'Generate QR Code'}
                </button>

                {/* Display Result */}
                <div className='output'>
                    {shortUrl && (
                        <>
                            <ShortenedLinkOutput
                                shortUrl={shortUrl}
                                onCopy={onCopy}
                            />
                            {copySuccess && (
                                <p className='copy-success'>
                                    Copied to clipboard!
                                </p>
                            )}
                        </>
                    )}
                    {qrCodeUrl && (
                        <div className='qr-code'>
                            <p>Your QR Code:</p>
                            <QRCodeSVG
                                value={qrCodeUrl}
                                size={128}
                            />
                        </div>
                    )}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default URLForm;
