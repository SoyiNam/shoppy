import React from "react";

export default function Banner() {
  return (
    <section className="block w-full max-h-96 overflow-hidden">
      {/* <img src={process.env.PUBLIC_URL + "/images/banner.png"} alt="" /> */}
      <img src="http://localhost:3000/images/banner.png?v=1" alt="Banner"></img>
    </section>
  );
}
