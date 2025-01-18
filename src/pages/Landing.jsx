import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
    const links = [
        { text: 'Login', link: '/login' },
        { text: 'Signup', link: '/signup' },
    ];

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100 bg-light"
            style={{ background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)' }}
        >
            <div
                className="card shadow-lg text-center p-5"
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    borderRadius: '15px',
                    background: 'white',
                }}
            >
                <h2 className="mb-4 text-dark">Welcome</h2>
                <p className="mb-4 text-muted">Please choose an option to proceed:</p>
                <div className="d-flex flex-column gap-3">
                    {links.map((link, i) => (
                        <Link
                            key={i}
                            to={link.link}
                            className="btn btn-primary btn-lg text-white fw-bold"
                            style={{
                                borderRadius: '30px',
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            {link.text}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
