import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/aboutus.module.css";
import { Brand } from "../components/componentsindex";
import images from "../img";

const aboutus = () => {
  const founderArray = [
    {
      name: "Farasat Ali",
      position: "Co-founder and Chief Executive",
      images: images.founder1,
    },
    {
      name: "Hassan Zaheer",
      position: "Co-founder and Chief Executive",
      images: images.founder2,
    },
    {
      name: "Darshan",
      position: "Co-founder and Chief Executive",
      images: images.founder3,
    },
    {
      name: "Talha Alam",
      position: "Supervisor, Chief Strategy Officer",
      images: images.founder4,
    },
  ];

  // const factsArray = [
  //   {
  //     title: "10K+",
  //     info: "Articles have been published around the world (as of Sept. 30, 2023)",
  //   },
  //   {
  //     title: "100K+",
  //     info: "Registered users account (as of Sept. 30, 2023)",
  //   },
  //   {
  //     title: "220+",
  //     info: "Countries and regions have our presence (as of Sept. 30, 2023",
  //   },
  // ];
  return (
    <div className={Style.aboutus}>
      <div className={Style.aboutus_box}>
        <div className={Style.aboutus_box_hero}>
          <div className={Style.aboutus_box_hero_left}>
            <h1>👋 About Us.</h1>
            <p>
              We are a cutting-edge NFT marketplace, dedicated to
              revolutionizing the world of digital art and collectibles. Our
              passion for innovation and creativity has driven us to build a
              platform where creators, collectors, and investors can interact
              and transact in a secure and seamless manner.
            </p>
          </div>
          <div className={Style.aboutus_box_hero_right}>
            <Image src={images.hero2} />
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>⛱ Team</h2>
          <p>
            We are a team that is a dynamic and collaborative group of
            professionals who work together to solve problems and create
            solutions to create the world a better place.
          </p>
        </div>

        <div className={Style.aboutus_box_founder}>
          <div className={Style.aboutus_box_founder_box}>
            {founderArray.map((el, i) => (
              <div className={Style.aboutus_box_founder_box_img} key={i}>
                <Image
                  src={el.images}
                  alt={el.name}
                  width={500}
                  height={500}
                  className={Style.aboutus_box_founder_box_img_img}
                />
                <h3>{el.name}</h3>
                <p>{el.position}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className={Style.aboutus_box_title}>
          <h2>🚀 Project Visionboard</h2>
          <p>
          </p>
        </div>

        <div className={Style.aboutus_box_facts}>
          <div className={Style.aboutus_box_facts_box}>
            {factsArray.map((el, i) => (
              <div className={Style.aboutus_box_facts_box_info}>
                <h3>{el.title}</h3>
                <p>{el.info}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      <Brand />
    </div>
  );
};

export default aboutus;
