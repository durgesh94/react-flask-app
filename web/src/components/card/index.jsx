import React from 'react';
import './card.css';

export const Card = ({ title, auther, content, date }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h2 className="title">{title}</h2>
                <p className="author">Written by John Doe</p>
            </div>
            <div className="card-body">
                <p>{content}</p>
            </div>
            <div className="card-footer">
                <p className="date">Published on January 1, 2025</p>
            </div>
        </div>
    )
}

