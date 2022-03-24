import Link from "next/link";
import React from "react";
import { SocialIcon } from 'react-social-icons';
import { useEffect, useState, useContext } from "react";

function FooterLayout() {
    const [isLoggedin, setIsloggedin] = useState<boolean>();
    const [profile, setProfile] = useState();
    const [cpa, setCpa] = useState(false);

    //Check whether user is logged in
    useEffect(() => {
        let uprofile = window.localStorage.getItem("cp-a");

        let key = window.localStorage.getItem("cart_id");
        //setJobid(key);
        let userprofile: any = JSON.parse(
            window.localStorage.getItem("user-profile")
        );
        setProfile(userprofile);
        let lStorage: any = window.localStorage.getItem("cp-a");
        lStorage = JSON.parse(lStorage);
        if (lStorage) {
            setIsloggedin(true);
        } else {
            setIsloggedin(false);
        }
    }, []);

    return (
        <>
            <div className="footer-layout">
                <div className="footer-container mb-5">
                    <div className="col-xl-4 col-lg-2 col-md-6 col-sm-3 footer-space">
                        <Link href="/market">
                            <img src="/assets/images/final_logo_footer.png" alt="Logo" className="footerimg"
                                style={{ width: "158px" }}
                            />
                        </Link>
                        <div className="row mt-1 market-brief">The ghmade is a business platform designed to help Sekondi-Takoradi business owners and individuals to increase revenue through sales, business partnerships and collaborations, investments, quick jobs and relevant information. Sign up as an individual or an organisation to enjoy the maximum benefits of this platform. </div>
                    </div>

                    <div className="col-md-4 footer-space">
                        <div className="row quick-links"><strong><h2 className="bold ml-3">Quick Links</h2></strong></div>
                        <ol className="quick-links-ol">

                            <Link href="/market">
                                <li className="market-link">Market</li>
                            </Link>
                            <Link href="/jobs/viewjobsandapply">
                                <li className="jobs-link">Jobs</li>
                            </Link>
                            <Link href="/forum/forum">
                                <li className="forum-link">Forum</li>
                            </Link>
                            <Link href="/blog/blog">
                                <li className="blog-link">Blog</li>
                            </Link>
                            {isLoggedin ? (
                                <Link href="/partnership/partnerships">
                                    <li className="partnership-link">Partnership</li>
                                </Link>
                            ) : ("")}

                            <Link href="/faqs">
                                <li className="FAQ-link">FAQ's</li>
                            </Link>
                            <Link href="/policy">
                                <li className="privacy-link">Privacy Policy</li>
                            </Link>
                            <Link href="/termsAndconditions">
                                <li className="terms-link">Terms & Conditions</li>
                            </Link>

                        </ol>
                    </div>

                    <div className="col-md-4 footer-space">
                        <div className="row contact"><h2 className="bold ml-3">Contact</h2></div>
                        <ol className="quick-links-ol">
                            <li>Ama Akroma Plaza</li>
                            <li>SSNIT, Takoradi</li>
                            <li>Telephone: <a href="tel:+233 20 583 4508" style={{ color: "white" }}>+233 20 583 4508</a></li>
                            <li>Mail: <a href="mailto:communityplatform@amalitech.com" style={{ color: "white" }}>communityplatform@amalitech.com</a></li>
                            <li>
                                <div className="mt-4">
                                    <SocialIcon target="_blank" rel="noopener" title="www.facebook.com/ghmadeofficial" className="mr-2" url="https://www.facebook.com/ghmadeofficial" fgColor="#ffff" bgColor="#1B98E0" style={{ height: 30, width: 30}} />
                                    <SocialIcon target="_blank" rel="noopener" title="www.instagram.com/ghmadeofficial" className="mr-2" url="https://www.instagram.com/ghmadeofficial" fgColor="#ffff" bgColor="#1B98E0" style={{ height: 30, width: 30 }} />
                                    {/* <SocialIcon target="_blank" title="www.youtube.com" className="mr-2" url="http://www.youtube.com/" fgColor="#ffff" bgColor="#1B98E0" style={{ height: 30, width: 30 }}/> */}
                                    <SocialIcon target="_blank" rel="noopener" title="www.linkedin.com/company/ghmade" className="mr-2" url="https://www.linkedin.com/company/ghmade/" fgColor="#ffff" bgColor="#1B98E0" style={{ height: 30, width: 30 }} />
                                    <SocialIcon target="_blank" rel="noopener" title="www.twitter.com/ghmadeofficial" className="" url="https://www.twitter.com/ghmadeofficial" fgColor="#ffff" bgColor="#1B98E0" style={{ height: 30, width: 30 }} />
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>

                <hr className="" />

                <div className="copyrightmsg justify-content-center">
                    <h6 className="mb-5"> &copy; 2020 ghmade Inc. All Rights Reserved.</h6>
                </div>

            </div>
        </>
    );

}


export default FooterLayout;