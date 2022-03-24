import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Link from 'next/link';
import ReactHtmlParser, {processNodes,convertNodeToElement, htmlparser2,} from "react-html-parser";

const partnershipType = {
  "GP": "General Partner",
  "LP": "Limited Partner"
}

function PartnershipCard({ businessName, location, timestamp, description, type, img, id }) {
  const [access,setAccess] = useState()
  useEffect(() => {
    let access = window.localStorage.getItem("cp-a")
    setAccess((JSON.parse(access)).access)
  })
  return (
      
    <Link href={{
      pathname: "/partnership/details/[id]",
      query:{id,pid:id,access:JSON.parse(window.localStorage.getItem("cp-a")).access}
    }}>
    {/* <Link href="/partnership/details/[id]" as={`/partnership/details/${id}`}> */}
          <div className="col-md-6">
            {/* The main card*/}
            <div className="partnershipCard card card-hover">

            <div className="row mt-4 ">
              <div>
                <span>
                  <img
                    className="business-image ml-4"
                    src={img || "/assets/images/Profile_Icon.png"}
                    alt="Business Logo"
                  />
                </span>
              </div>

              <div className="">
                <span>
                <h5 className="ml-4 "><strong>
                  { businessName ? businessName : "No name"}</strong></h5>
                </span>
              <span className="d-flex ml-4">
                <i className="fe fe-map-pin"/>
                <h6 className="ml-2 text-small">{ location ? location : "Not specified"}</h6>
                <i className="ml-4 fe fe-clock"/>
                <h6 className="ml-2 text-small"> {moment(timestamp).fromNow()}</h6>
              </span>
              </div>
            </div>

          <div className="row mt-4">
              <h5 className="ml-5">
              <strong>Partnership Description</strong>
          </h5>
          </div>
              <div className="row mb-1 ml-3 partnership-description">
              {ReactHtmlParser(description)}
          </div>

          <div className="mt-7">
            { type === "GP" ? <h5 className="ml-3"><strong>General Partner (Co-Owner)</strong></h5> : <h5 className="ml-3"><strong>Limited Partner (Investor)</strong></h5> }
            {/* <h5><strong>{ type }</strong></h5> */}
          </div>
            </div>
          </div> 
      </Link>  
    )
}

export default PartnershipCard