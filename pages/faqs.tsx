import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import FooterLayout from '../components/FooterLayout'
import MainLayout from '../components/MainLayout'

function faqs() {
    return (
        <>
          <MainLayout>
          <div>
          <div className="page-header mt-6">
            <h3 className="page-title ">Frequently Asked Questions</h3>
          </div>

               <div className="ml-4 d-flex">
                  <ul className="nav nav-tabs faqs-nav-tabs row faqs-nav-link-tabs" id="myTab" role="tablist">
                    {/* Market FAQs */}
                  <li className="nav-item">
                    <a className="nav-link faqs-nav-link active" id="market-tab" data-toggle="tab" href="#market" role="tab" aria-controls="home" aria-selected="true">Market FAQs</a>
                  </li>

                  {/* Jobs FAQs */}
                  <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#jobs" role="tab" aria-controls="profile" aria-selected="false">Jobs FAQs</a>
                  </li>
                  
                  {/* Partnership FAQs */}
                  <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#partnership" role="tab" aria-controls="contact" aria-selected="false">Partnership FAQs</a>
                  </li>

                  {/* Forum FAQs */}
                  <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#forum" role="tab" aria-controls="contact" aria-selected="false">Forum FAQs</a>
                  </li>

                  {/* Blog FAQs */}
                  <li className="nav-item">
                    <a className="nav-link disabled disabled-faqs" id="contact-tab" data-toggle="tab" href="#blog" role="tab" aria-controls="contact" aria-selected="false">Blog FAQs</a>
                  </li>

                </ul>
            </div>
            </div>



              <div className="tab-content mt-4" id="myTabContent">
              <h6><strong><em> Please take a moment to read through these FAQs and guidelines. There is some useful information about how to use the platform, our guidelines for behavior, and how to set up your account and profile.</em></strong></h6> 
                
                {/* Market FAQs Content */}
                <div className="tab-pane fade show active" id="market" role="tabpanel" aria-labelledby="market-tab">
                <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong> Q: Can I return items bought and have my money refunded to me if I'm not satisfied with them? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                              <strong> A:</strong> Unfortunately, our platform does not support or have a return or refund policy.  
                                                    This, therefore, means that you (the buyer) and the business owner will have to work this out off the platform. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I post my products or services on the platform? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong>Click on Market and select Add Product/Service and fill the form. Click ‘Done’ and customers can view your products or services.<br/><br/>
                        <strong>NB:</strong><em>You can only post a product or service after you have successfully signed-up, logged-in and filled your profile as an organization. </em>

                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I delete or edit my already-uploaded product or service images? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                          <strong>A:</strong> After logging in, click on Market and select My Product/Services. Check the box on the particular product you want to delete and click the delete button to delete the product. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How long do my product or service images stay on the platform? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> The product or service images you upload will stay on the platform if you haven’t deleted them. Nonetheless, you have the responsibility of updating them if your products or services change or when you run out of stock.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Why has my product(s) been deleted from the platform? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> All posted products or services are reviewed by the admin to ensure that they conform to compliance. Therefore, if your posts violate our policy rules, they will be deleted. Note, however, that you would be informed of the exact reason for the deletion of your product(s) or service(s) as well as the changes you are required to implement before reposting. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: I am getting contacted about a product I didn't post; can you help me? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> Yes, we can help you. Contact us through our contact details on the platform and narrate the details to our helpdesk administrator and you will be assisted. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Does community platform make money from business/product owners?  </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> ghmade does not make any money from any business owner or user of the platform.  It's solely a social responsibility rendered by AmaliTech Services to the people of Sekondi-Takoradi Metropolis.  
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What are the rules for posting products or services on the community platform? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> We don't allow the following to be posted:
                        <p className="ml-6">
                        <li>a product that is illegal in Ghana</li>  
                        <li>a product that is not located in Sekondi-Takoradi</li>
                        <li>an invalid telephone number attached to the product </li>
                        <li>offensive pictures and pictures that do not match or clearly show the advertised item</li>
                        <li>multiple pictures of the same item </li>
                        <li>counterfeit or expired goods</li>
                        </p> 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Why would the platform ensure that there are rules guiding the posting of products or services? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> This is because the community platform is committed to creating a safe and trusted platform for business transactions for the people of Sekondi-Takoradi. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I get my products delivered to me if I can't go pick them up myself?  </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> The business you will order from will contact any of the various delivery services on the platform to negotiate charge for the delivery of the product. The business will then call you back to tell you the terms and conditions for the payment for the delivery.  
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Is there a discount on any of the products or services?   </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> If there are any discounts on products or services, the business owners will specify it when they post their products or services. Discount on products or services depend solely on the business owners. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                    </div>



                {/* Jobs*/}
                    <div className="tab-pane fade" id="jobs" role="tabpanel" aria-labelledby="profile-tab">
                    <Accordion>
                      {/*The card for changing of email*/}
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong> Q: Do I need only a PC before I can visit ghmade?  </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                              <strong className="mr-1"> A:</strong> No. You can also access <strong>ghmade</strong> on your mobile phone, tablet or iPad.  
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      {/*The card for changing of email*/}
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q:  Is access to the Job Portal free?  </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong> Yes, access is free for job seekers and job posters. <br/><br/>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      {/*The card for changing of email*/}
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I apply for a job? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                          <strong className="mr-1">A:</strong> At the Jobs Section, search for a job by industry, skill set, or location and click on the title of a posted job, and click on Apply, or follow the directions for applying in the selected listing.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What happens when I apply online for jobs posted on ghmade?  </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong> Your profile (and attached documents - if required) will be sent to the employer who will handle the hiring process. Do not worry if you do not receive immediate response. Sometimes it takes weeks or even months to sort applications. Be rest assured that the employer will contact you if you are a successful candidate.   
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Do I need a resume(CV) to apply to a job posting? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong> It depends on if the Job Poster requests for it. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: If I get a job through ghmade, will ghmade collect part of my salary?  </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong> No, Ghmade does not get a cut out of your salary nor do we demand for such. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I search for job adverts on the Jobs portal? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong  className="mr-1">A:</strong> Use our Job Search Filter on the page. This option lets you filter the job adverts by location, industry and/or job type. After selecting your preferences, click on the "Search" button. <br/> <br/>
                        The other option is to enter the keywords you want to search for into the text box under Job Keyword Search. Click on "Search" after you have typed in your keyword(s). 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                      {/* <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I receive Free Job Email Alerts?  </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>You need to be <strong>registered as a Job Seeker and logged in.</strong>  <br/> 
                          At the Jobs section, search for a job by category, then go ahead to get new jobs by clicking “email button” or a subscribe button.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion> */}
                      {/* <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I edit or unsubscribe from my job alerts? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong> Based on the job alert emails you get from ghmade; you may wish to modify keyword and job location in your Job Alert to get more suitable results. You can also remove your Job Alerts if you don’t want to get any more alert emails by clicking unsubscribe at the bottom of the mail. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion> */}
                </div>

  
                {/* Forum FAQs  */}
            <div className="tab-pane fade" id="forum" role="tabpanel" aria-labelledby="contact-tab">
                 <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Can I create more than one account? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                              <strong className="mr-1"> A:</strong> We only allow one account per person. If you lose access to your account, there’s no need to create another one. Instead, try resetting your password on the login page, or contact the administrator at <strong><a href="mailto:http://www.admin@ghmade.com">admin@ghmade.com</a></strong> for help.  
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Does it matter the name I use on the platform?</strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong> When completing your profile as a business, you can use your company name as your  
                                            First and/or last name. Nonetheless, when completing your profile as an individual, you are required to use a decent name, preferably your real name. Using an inappropriate name will result in the admin suspending your account.  
                                            Also, don’t include “Name of the Platform” (or any variation of it) in your name. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I recover my suspended account? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                          <strong className="mr-1">A:</strong> Contact the admin through email and place a request. The admin will get back to you within a period of time
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Can I use just any avatar as my profile picture?   </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>You are allowed to use your business logo or your personal picture. Avatars must not contain inappropriate photos or logo.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Before posting a question, what do I do?</strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong> Whether you’re after a quick answer to a question or you’re looking to meet people who will bounce around ideas and get you inspired, before posting a new question, use “search” to see if it’s already been asked and answered.<br/>
                                            <br/>Please spend some time browsing the topics on the platform before replying or starting your own, and you’ll have a better chance of meeting others who share your interests.

                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I use this forum? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong> You are entreated to kindly make the effort to put things in the right place during discussions. So: 
            <p className="ml-6"><li>Don’t start a topic in the wrong category. </li> 
            <li>Don’t cross-post the same thing in multiple topics. </li> 
            <li> Don’t post no-content replies.</li> 
            <li>Don’t bump threads. </li> 
           <li> Don’t divert a topic by changing it midstream. </li>
           <li>Rather than taking an existing topic in a radically different direction, start a New Topic. </li> 
            <li> Don’t spam. We have a zero-tolerance policy. Do it once and you’re out. </li> 
            <li> Make quality posts. (See the Post Quality section below for details.) You are cautioned not to post low-quality posts. It will warrant a friendly warning for, and should you repeat it, your account will be suspended. </li>
            <li>Do not post religious or political discussions. Failure to comply warrants a suspension of your account. </li> 
            <li>Do not post personal insults. Do not use derogatory, defaming and inappropriate use of language. Courtesy is high required.</li> 
            <li>Be civil. Don’t post anything that a reasonable person would consider offensive, abusive, or hate speech.</li> 
             <li>Keep personal information private. All posts in the forum are easily found via search engines, so unless you’re willing to expose your information to the world, please do not post telephone numbers, e-mail addresses, etc. in your posts.</li> 
             </p>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What features are available to me in the forum section? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>Ghmade provides features that enable the community to collectively identify the best (and worst) contributions: upvote, downvote, edit, delete and so forth. Use these features to improve your own experience, and everyone else’s, too. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What do I do when I see a problem?  </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>It is the job of the Admin to ensure that everything is clean and tidy, but there may never be enough admins to look at every post, so we rely on you to help out. You can do that by clicking the ‘Report’ button to alert the admin of anything you see that looks off base. It might be a post that’s rude, it might be spam or maybe it’s just in the wrong forum. Instead of replying to inappropriate posts, flag or report it. If enough flags accrue, action will be taken, either automatically or by admin intervention. <br/><br/>
                        In order to maintain our community, admins reserve the right to remove any content and any user account which does not conform to compliance. Admins do not preview new posts in any way; the admins and site operators take no responsibility for any content posted by the community. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What do I do when I need help? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong> No worries. You can send a message to the Admin. Administrators are the Community Manager and co-administrator of the forum.  
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                      </div>

                      

              {/* Blog FAQs */}
             <div className="tab-pane fade" id="blog" role="tabpanel" aria-labelledby="contact-tab">
                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong> Q: Can I return items bought and have my money refunded to me if I'm not satisfied with them? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                              <strong> A:</strong> Unfortunately, our platform does not support or have a return or refund policy.  
                              This, therefore, means that you (the buyer) and the business owner will have to work this out off the platform. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I post my products or services on the platform? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong>  Select ‘create post’ on your dashboard and enter the following: your product name, product description, product category, and prices, and upload the product or service image(s). Click ‘Done’ and customers can view your products or services.<br/><br/>
                        <strong>NB:</strong><em> You can only post a product or service after you have successfully signed-up, logged-in and filled your profile</em>

                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Can I subscribe for email alerts for product update and sales reports?</strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                          <strong>A:</strong> Yes you can; by clicking the subscribe button in the Marketplace section for subscriptions you are interested in.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I delete or edit my already-uploaded product or service images? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> After logging in, there are buttons or options on your dashboard to either delete or edit your uploaded products. Click the delete button to delete the image or the edit button to replace the image of your choice.  
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How long do my product or service images stay on the platform? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> The product or service images you upload will stay on the platform if you haven’t deleted them. Nonetheless, you have the responsibility of updating them if your products or services change or when you run out of stock.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Why has my product(s) been deleted from the platform? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong>  All posted products or services are reviewed by the admin to ensure that they conform to compliance. Therefore, if your posts violate our policy rules, they will be deleted. Note, however, that you would be informed of the exact reason for the deletion of your product(s) or service(s) as well as the changes you are required to implement before reposting. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: I am getting contacted about a product I didn't post; can you help me? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> Yes, we can help you. Contact us through our contact details on the platform and narrate the details to our helpdesk administrator and you will be assisted 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Does community platform make money from business/product owners?  </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> Community platform does not make any money from any business owner or user of the platform.  It's solely a social responsibility rendered by AmaliTech Services to the people of Sekondi-Takoradi Metropolis.  
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What are the rules for posting products or services on the community platform? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> We don't allow the following to be posted:
                        <p className="ml-6">
                        <li>a product that is illegal in Ghana</li>  
                        <li>a product that is not located in Sekondi-Takoradi</li>
                        <li>an invalid telephone number attached to the product </li>
                        <li>offensive pictures and pictures that do not match or clearly show the advertised item</li>
                        <li>multiple pictures of the same item </li>
                        <li>counterfeit or expired goods</li>
                        </p> 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Why would the platform ensure that there are rules guiding the posting of products or services? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> This is because the community platform is committed to creating a safe and trusted platform for business transactions for the people of Sekondi-Takoradi. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I get my products delivered to me if I can't go pick them up myself?  </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> The various delivery services registered on the platform will be displayed at the point of ordering. You can select the one of your choice to deliver your products to you, and they will be notified of your order. They will contact you to discuss payment terms 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Is there a discount on any of the products or services?   </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong>A:</strong> If there are any discounts on products or services, the business owners will specify it when they post their products or services. Discount on products or services depend solely on the business owners. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                  </div>

              {/* Partnership FAQs */}
                  <div className="tab-pane fade" id="partnership" role="tabpanel" aria-labelledby="contact-tab">
                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What happens after I post a business request? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                              <strong className="mr-1"> A:</strong>Wait for other businesses who are interested in your request to contact you. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What is the difference between collaborating and partnering?  </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong> Collaboration involves cooperation in which parties are not necessarily bound contractually. <br/><br/>
                                          A partnership is a contractual relationship involving close cooperation between two or more parties having specified and joint rights and responsibilities. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Can I make multiple business requests in the partnerships section? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                          <strong className="mr-1">A:</strong>Yes, you can make multiple business requests and keep track of all requests made on your dashboard. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                    <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: Will my business documents be inspected before I can make a business request? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>  No, you can make a business request without presenting any documents. Nonetheless, the business owner you are entering into the partnership with can request it. Since further discussions on partnerships, collaborations or investments take place off the platform, the two parties involved get to agree on their own terms and conditions.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What if I am not interested in partnering with the organization which responded to my business request? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong> Simply ignore the response and move on with the other respondents.  
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong> Q: What is a partnership and how do I create one? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>A partnership is a business owned by two or more people. There are two different types of business partnerships on our platform: 
                                    <p className="ml-6"> <li>General Partner (co-owner)</li> 
                                    <li>Limited Partner (Investor)</li></p> <br/>
                                  To register a partnership, a copy of the partnership agreement and a statement signed by all the partners must be submitted to the Registrar General’s Department stating particulars of the name of the partnership, nature of business, address of the principal place of business and all other places in Ghana at which the business is carried on, names and addresses and occupations of the partners, date of commencement, and particulars of any charges requiring registration.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: When can I conclude that there has been a breach of agreement? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>A breach of agreement means that one party did not live up to their end of the bargain. If any of the terms or agreements are not met, this could be considered a violation of the agreement, or a "breach".
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What does the platform do in the event where there is a breach of partnership or collaboration? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>Since the platform solely plays the role of linking two or more parties together, it has no way of verifying the details of a partnership, collaboration, or investment because these are supposed to be carried out off the platform. The responsibility therefore lies with the partners or parties to sort out any differences of which the platform will not be involved.  
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How can I enforce an agreement? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>The most common way to resolve business agreement disputes and enforce agreements is through the court system. However, courts and lawsuits are not the only option for businesses. Mediation and arbitration are also solutions. 
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What is "offer" and "acceptance"? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>Offer and acceptance are the beginning part to any agreement. When one party makes an offer and the other party accepts the offer, an agreement has been reached. At this point, the only other thing needed to become a legally enforceable agreement is "consideration."  
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What is "consideration"; do I need a consideration in forming a partnership? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>For the agreement to be valid, the agreement must include some form of consideration. This means the agreeing parties must exchange "something of value" from the agreement.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What are the advantages of forming a partnership?  </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>It is easy to establish:   
                      <p className="ml-6"> 
                      <li>Raising funds may be easier with more owners </li> 
                      <li>Profits go right into partners' pockets </li> 
                      <li>Partners can combine their individual talents to complement each other and strengthen the partnership </li> 
                      </p>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: What are the advantages of collaborating? </strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>It is easy to establish:   
                      <p className="ml-6"> 
                      <li> A business that collaborates with another company has the advantage of a wider pool of information available to aid in business decisions and marketing opportunities.</li> 
                      <li>There is the benefit of financial assistance, that is, the opportunity to boost domestic or export sales to meet demand when one party is in short of supply, to tender for larger contracts or cut costs by sharing resources</li> 
                      <li>There is the benefit of human capital, that is, the opportunity to harness the skills and abilities of employees from both parties, the opportunity to safeguard jobs and increase employment.</li> 
                      <li>There is the benefit of physical capital, that is, the opportunity to share facilities, equipment, resources, and raw materials.</li> 
                      <li>There is the benefit of intellectual capital, that is, the opportunity to tap into the expertise, knowledge and capabilities of the business you’d want to collaborate with.</li> 
                      </p>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>

                      <Accordion>
                      <Card className="account-setting-card">
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="email-toggle"
                          className="account-header"
                        >
                          <div className="">
                            <span className="account-title">
                              <strong>Q: How do I terminate a partnership?</strong>
                            </span>
                          </div>
                          <div>
                          <span className="account-title edit-button">
                              <i className="fe fe-chevron-down"/>
                          </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="email-toggle">
                          <Card.Body>
                        <strong className="mr-1">A:</strong>In the absence of a written agreement, partnerships end when one partner gives notice of will to leave the partnership. If you don't want your partnership to end so easily, you can have a written agreement that outlines the process through which the partnership will dissolve. For example, the partnership can dissolve if a certain event happens or it can provide a mechanism whereby the partnership can continue if the remaining partners agree to do so.
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
           
        </div>
        </div>
      </MainLayout>
      <FooterLayout/>
    </>
  );
}

export default faqs;