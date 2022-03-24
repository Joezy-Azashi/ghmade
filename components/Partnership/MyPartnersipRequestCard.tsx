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
            <h5>
              <strong className="ml-3">{partnership.type}</strong>
            </h5>
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

          <div className="ml-4">
            <span className="d-flex">
              <h6 className="ml-2 text-small ">
                 {partnership.business.location}
              </h6>
              <h6 className="ml-4 text-small">
                {moment(partnership.timestamp).fromNow()}
              </h6>
            </span>
          </div>
        </div>
        <Link href="/partnership/edit/[partnershipId]" as={`/partnership/edit/${partnership.key}`}>
        <a>
        <div className="row mt-4">
          <h5 className="ml-5">
            <strong>Partnership Description</strong>
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