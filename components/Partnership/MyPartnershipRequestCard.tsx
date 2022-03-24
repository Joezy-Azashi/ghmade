import React from "react";
import moment from "moment";
import Link from "next/link";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

function MyPartnershipRequestCard({ partnership, setCheckedList, setCheck }) {
  return (
    <div className="col-md-6">
      {/* The main card*/}

      <div className="partnershipCard card">
        <div className="row mt-5">
          <div className="col-md-12 d-flex justify-content-between">
            { partnership.type === "GP" ? <h5 className="ml-3 "><strong>General Partner (Co-Owner)</strong></h5> : <h5 className="ml-3 bold"><strong>Limited Partner (Investor)</strong></h5> }
            
            <div className="d-flex">
                <div>
                    <input
                      type="checkbox"
                      className="mr-2 checkbox-partnership"
                      checked={partnership.checked}
                      onChange={(e) => {
                        setCheck(partnership.key);
                        if (e.target.checked) {
                          setCheckedList((prev) => [...prev, partnership.key]);
                        } else {
                          setCheckedList((prev) => {
                            prev.splice(
                              prev.findIndex((i) => i == partnership.key),
                              1
                            );
                            return prev;
                          });
                        }
                      }}
                    />
                  </div>
                  <div>
                      <Link href="/partnership/edit/[partnershipId]" as={`/partnership/edit/${partnership.key}`}><i className="fe fe-edit-2"></i></Link>
                  </div>
            </div>
          </div>

          <div className="ml-5">
            <span className="d-flex">
            <i className="fe fe-map-pin"/>
              <h6 className="ml-2 text-small">
                {partnership.business.city ? partnership.business.city : "Not specified"}
              </h6>
              <i className="ml-4 fe fe-clock"/>
              <h6 className="ml-2 text-small">
                {moment(partnership.timestamp).fromNow()}
              </h6>
            </span>
          </div>
        </div>
        <Link href="/partnership/edit/[partnershipId]" as={`/partnership/edit/${partnership.key}`}>
        <a>
        <div className="row mt-4">
          <h5 className="ml-5">
            <strong style={{color: "#13293D"}}>Partnership Description</strong>
          </h5>
        </div>
        <div className="row mb-1">
          <p className="ml-5 partnership-description">
            {ReactHtmlParser (partnership.description)}
          </p>
        </div>
        </a>
        </Link>
      </div>
    </div>
  );
}

export default MyPartnershipRequestCard;
