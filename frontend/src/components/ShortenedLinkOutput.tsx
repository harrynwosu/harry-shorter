import React from 'react';
import '../styles/ShortenedLinkOutput.css';

interface ShortenedResultProps {
    shortUrl: string;
    onCopy: () => void;
}

const ShortenedResult: React.FC<ShortenedResultProps> = ({
    shortUrl,
    onCopy,
}) => {
    return (
        <div className='shortened-result'>
            <p>Your shortened link:</p>
            <div className='short-url'>{shortUrl}</div>
            <button
                type='button'
                className='copy-button'
                onClick={onCopy}
            >
                Copy to Clipboard
            </button>
        </div>
    );
};

export default ShortenedResult;
