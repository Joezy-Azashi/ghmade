import React, { useEffect, useState } from "react";

export default function BlogPost2({ login }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (data) {
    return (
      <section className="blog-content">
        <section className="blog-captions">
          <div className="float-left" id="blog-head-sec">
            <div className="blog-heading">
              <h2>How to choose the best domain Registrar in 2020</h2>
            </div>
            <div className="sub-heading">
              <p>
                posted on {data.updated_at} by <b>{data.name}</b>
              </p>
            </div>
          </div>
        </section>

        <section className="blog-body">
          <img src={data.avatar_url}></img>
        </section>

        <section className="blog-body-text">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias id
            quisquam voluptates, esse inventore optio corrupti. Velit recusandae
            laboriosam adipisci aliquid magni vel, ipsum, expedita amet
            explicabo, assumenda vitae maiores. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Similique hic molestiae distinctio
            commodi incidunt quam aliquam veniam iste impedit fugit officiis,
            adipisci nesciunt esse ea aspernatur provident soluta quasi laborum!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis,
            aliquam cupiditate, ducimus quod non vitae deleniti ad corporis
            eaque omnis consectetur? Repudiandae sequi libero recusandae minima
            neque. Eius, illum cupiditate! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Perspiciatis nihil, quae adipisci
            reprehenderit corporis harum possimus doloremque laboriosam, totam
            sunt ab. Animi repellat, optio dolorum beatae eos architecto vel
            similique!
          </p>
        </section>
      </section>
    );
  }

  return "Francis Marley";
}
