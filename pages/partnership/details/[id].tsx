import React, { useEffect, useState } from 'react'
import MainLayout from '../../../components/MainLayout'
import moment from 'moment';
import { useRouter } from 'next/router'
import { Partnership } from '../../../lib/endpoints/partnership';
import ReactHtmlParser, {processNodes,convertNodeToElement, htmlparser2,} from "react-html-parser";

const PARTNERSHIP_TYPE = [
    {key:'GP', name:'General Partner'},
    {key:'LP', name:'Limited Partner'},
]
const INDUSTRY_TYPE = [
    {key:'AG', name:'Agriculture'},
    {key:'CT', name:'Construction'},
    {key:'CA', name:'Creative Arts'},
    {key:'ED', name:'Education'},
    {key:'ET', name:'Entertainment'},
    {key:'FS', name:'Financial Services'},
    {key:'HP', name:'Health and Pharmaceutical'},
    {key:'IE', name:'Import and Export'},
    {key:'IT', name:'Information Technology'},
    {key:'MF', name:'Manufacturing'},
    {key:'MN', name:'Mining'},
    {key:'OG', name:'Oil and gas'},
    {key:'RE', name:'Real Estate'},
    {key:'RW', name:'Retail and Wholesale'},
    {key:'TE', name:'Telecommunication'},
    {key:'TH', name:'Tourism and Hospitality'},
    {key:'TV', name:'Transport and Vehicle'},
    {key:'WS', name:'Water and Sewage'},
]

export default function partnershipDetails() {
  const router = useRouter()
  const [image,setImage] = useState()
  const [title, setTitle] = useState()
  const [city, setLocation] = useState()
  const [type,setType] = useState()
  const [industry,setIndustry] = useState()
  const [timestamp,setTimestamp] = useState()
  const [email,setEmail] = useState()
  const [phone,setPhone] = useState()
  const [bdescription,setBdesription] = useState()
  const [pdescription, setPdescription] = useState()
  
  function getQueryParams(query){
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split('&')
          .reduce((params, param) => {
                  let [key, value] = param.split('=');
                  params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                  return params;
              }, {}
          )
      : {}
  };

  useEffect(() => {    
    (async () => {
      const { pid } = getQueryParams(window.location.search)    
      let rs = await new Partnership().partnershipDetails(pid)
      setTitle(rs.business.title)
      setLocation(rs.business.city)
      setPhone(rs.phone_number)
      setEmail(rs.email)
      setTimestamp(rs.timestamp)
      setType(rs.type)
      setIndustry(rs.industry)
      setImage(rs.business.image)
      setBdesription(rs.business.description)
      setPdescription(rs.description)
    })()
  }, []); 
  
    return (
        <div>
            <MainLayout>
              {/* page-header */}
                <div className="row page-header">
                  <h1 className="page-title">Partnership Request</h1>
                </div>
                  <div className="card partnership-detail-card pt-5 mb-5 ml-1 mr-2">
                    <div className="row d-flex pl-6 mb-5">
                      <span>
                        <img
                          className="business-image-partnershipDetail ml-4"
                          src={image || "/assets/images/default-add-image.png"}
                          alt="Business Logo"
                        />
                      </span>
              

                    <div className="">
                    <span>
                  <h5 className="ml-2 mt-3"><strong>{title}</strong></h5>
                    </span>
                    </div>
                    </div>
                  
                  
                  <div className="row ml-3">
                    <div>
                      <h6 className="fe fe-map-pin ml-5">
                        <span className="ml-2 capitalize-text">{city}</span>
                      </h6>
                    </div>
                    <div>
                      <h6 className="ml-5">{moment(timestamp).format('llll')}</h6>
                      </div>
                    </div>
                  </div>

                <div className="card job-detail-card2 row ml-1 mr-2">
            <div className="row ml-5 mr-5 pt-1">
              <div className="col-md-12 jobdetailtext">Partnership Details</div>
              <div className="col-md-3">
                <div className="jobdetailheader">Type of Partnership</div>
                {PARTNERSHIP_TYPE.filter(el => el.key === type).map(el => (<>{el.name}</>))}
                </div>
              <div className="col-md-3">
                <div className="jobdetailheader">Type of industry</div>
                <div>
                  {INDUSTRY_TYPE.filter(el => el.key === industry).map(el => (<>{el.name}</>))}
                </div>
              </div>
              <div className="col-md-3">
                <div className="jobdetailheader">Email</div>
                <div className="sentence-text">{email ? <a style={{color: "inherit"}} href={`mailto:${email}`}>{email}</a> : "Not provided"}</div>
                </div>
              <div className="col-md-3">
                <div className="jobdetailheader">Phone Number</div>
                {phone ? <a style={{color: "inherit"}} href={`tel:${phone}`}>{phone}</a> : "Not provided"}
              </div>
            </div>
          </div>

          <div className="card job-detail-big-card row d-flex justify-content-end pt-1 pb-3 pl-5 pr-5 mr-2 ml-1">
          <div className="jobDescrition-jobDetailsc col-md-12 mt-2 mb-5">
              <div className="mb-3 jobdescriptionheader jobdetailtext">
                Business Description
              </div>

              <div>
                <p className="jobdescriptiontext">
                {ReactHtmlParser(bdescription)}
                </p>
              </div>
            </div>
            </div>

          <div className="card job-detail-big-card row d-flex justify-content-end pt-1 pb-3 pl-5 pr-5 mr-2 ml-1">
          <div className="jobDescrition-jobDetailsc col-md-12 mt-2 mb-5">
              <div className="mb-3 jobdescriptionheader jobdetailtext">
                Partnership Description
              </div>
              <div>
                <p className="jobdescriptiontext">
                  {ReactHtmlParser(pdescription)}
                </p>
              </div>
            </div>
            </div>



            </MainLayout>  
        </div>
    )
}