import React from 'react';

import Particles from 'react-particles-js';

export default () => {
    return (
        <div className='particle-backround'>
            <Particles
                params={{
                    "particles": {
                        "number": {
                            "value": 60,
                            "density": {
                                "enable": true,
                                "value_area": 500
                            }
                        },
                        "color": {
                            "value": "#182a78"
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#182a78"
                            },
                            "polygon": {
                                "nb_sides": 5
                            },
                        },
                        "opacity": {
                            "value": 0.5,
                            "random": false,
                            "anim": {
                                "enable": false,
                                "speed": 2,
                                "opacity_min": 0.5,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 2,
                            "random": true,
                            "anim": {
                                "enable": false,
                                "speed": 2,
                                "size_min": 0.1,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": "#182a78",
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 2,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false,
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }

                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "grab"
                            },
                            "resize": true
                        },
                        
                    }


                }}
            />
        </div>
    );
};
