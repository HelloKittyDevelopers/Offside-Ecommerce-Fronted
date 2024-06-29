import React from 'react';

function Rating({ value, text, color = '#f8e825' }) {
    return (
        <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                    <i
                        style={{ color }}
                        className={
                            value >= star
                                ? 'fas fa-star'
                                : value >= star - 0.5
                                    ? 'fas fa-star-half-alt'
                                    : 'far fa-star'
                        }
                    ></i>
                </span>
            ))}
            {text && <span>{text}</span>}
        </div>
    );
}

export default Rating;