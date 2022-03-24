import React from "react";
import ComingSoon from "../components/ComingSoon";
import FooterLayout from "../components/FooterLayout";
import MainLayout from "../components/MainLayout";
import PartnershipCard from "../components/Partnership/PartnershipCard";


function Partnerships() {
  return (
    <>
    <MainLayout title="Community Project" pageTitle="Partnerships Page">

      {/*Partnerships Header banner */}
    <div className="jobsbanner mb-5">
          <img
            className="jobsbannerimg"
            src="/assets/images/jobsBannerr.jpg"
            alt="HeaderBanner"
          />
          <div className="jobbanner-text">
            <p className="jobbanner-text-header">
              Find the perfect <br />
              Partnerships for your Business
            </p>
            <p className="jobbanner-text-body">
              This Partnerships page provides you with access to quick Partnerships, <br />
              professional, apprenticeship opportunities, and more.
              <br />
              Just post a job if you need a job done for you, or apply for the{" "}
              <br />
              jobs that best suit your interest.
            </p>
          </div>
        </div>
        {/*Partnerships Header banner */}

          {/* The partnerships search column */}
        <div className="searchjobs mb-5">
            <input
              id="searchpartnerships"
              className="form-control form-rounded"
              type="text"
              placeholder="Search Partnerships"
            />
        </div>
        {/* </div> */}

        {/* The Partnership requested posted (cards) */}
        <div className="row mt-5">
            
        </div>


    </MainLayout>
    <FooterLayout/>
    </>
  );
}

export default Partnerships;
