import React from "react";

const Footer = () => {
    return (
        <div>
            <div class='footer-bs'>
                <div class='row'>
                    <div
                        class='col-md-3 footer-brand animated fadeInLeft'
                        style={{ marginTop: "-1%" }}
                    >
                        <h4>GEEK TEXT</h4>
                        <p>
                            Suspendisse hendrerit tellus laoreet luctus
                            pharetra. Aliquam porttitor vitae orci nec
                            ultricies. Curabitur vehicula, libero eget faucibus
                            faucibus, purus erat eleifend enim, porta
                            pellentesque ex mi ut sem.
                        </p>
                        <p>2019 No rights reserved</p>
                    </div>
                    <div
                        class='col-md-4 footer-nav animated fadeInUp'
                        style={{ marginRight: "-10%" }}
                    >
                        <h4>Team_</h4>
                        <div class='col-md-6'>
                            <ul class='pages'>
                                <li>Slav Tourachev</li>
                                <li>Steven Valle</li>
                                <li>Shannah Sit</li>
                                <li>Steven Villa</li>
                                <li>Lalliet Vila</li>
                                <li>Noe Velasquez</li>
                            </ul>
                        </div>
                    </div>
                    <div class='col-md-2 footer-social animated fadeInDown'>
                        <h4>Follow Us</h4>
                        <ul>
                            <li>
                                <a href='#'>Facebook</a>
                            </li>
                            <li>
                                <a href='#'>Twitter</a>
                            </li>
                            <li>
                                <a href='#'>Instagram</a>
                            </li>
                        </ul>
                    </div>
                    <div class='col-md-3 footer-ns animated fadeInRight'>
                        <h4>Book Search</h4>
                        <p>
                            A rover wearing a fuzzy suit doesn’t alarm the real
                            penguins
                        </p>
                        <p>
                            <div class='input-group'>
                                <input
                                    type='text'
                                    class='form-control'
                                    placeholder='Search for...'
                                />
                                >
                                <span class='input-group-btn'>
                                    <button
                                        class='btn btn-default'
                                        type='button'
                                    >
                                        <span class='glyphicon glyphicon-envelope'></span>
                                    </button>
                                </span>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
