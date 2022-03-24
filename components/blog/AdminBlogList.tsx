import React from 'react';
import Link from "next/link";
import moment from "moment";
function AdminBlogList ({blog} : any ) {
    return (
        <div>
            <Link href="/blog/admin/[key]" as={`/blog/admin/${blog.key}`}>
            <div className="card mb-4">
                <div className="row mt-3">
                    <h5 className="ml-6 jobdetailtext capitalize-text">{blog.title}</h5>
                </div>
                <div className="row ml-4">
                    <div>
                        <h5>
                            <img src ={
                                blog.business_profile.image ?
                                blog.business_profile.image : "/assets/images/Profile_Icon.png" } className="business-image mr-2" alt=""/>
                                { blog.business_profile.title ? (
                                    blog.business_profile.title
                            )
                                : 
                                (
                                    "Admin"
                                )
                            }
                        </h5>
                    </div>
                    <div className="time-icon">
                        <h5 className="fe fe-clock ml-3"><span className="ml-1">{moment(blog.edited_at).fromNow()}</span></h5>
                    </div>
                </div>
            </div>
            </Link>
          
        </div>
    )
}
export default AdminBlogList;