import { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import { MdLocalPharmacy, MdMedicalServices } from "react-icons/md";
import { FaPills } from "react-icons/fa";
import Link from "next/link";

const HomeUser = () => {
  const { businessCollection, getBusinessCollection, getPosts } =
    useStateContext();

  const icons = {
    Pharmacy: <MdLocalPharmacy className="business-icons" />,
    "Medical Service": <MdMedicalServices className="business-icons" />,
    Laboratory: <FaPills className="business-icons" />,
  };

  useEffect(() => {
    getBusinessCollection().then(() => console.log("Query collections"));
  }, [businessCollection]);

  useEffect(() => {
    const fetchData = async () => {
      await getPosts();
    };
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <span>
        Click on the options below to see the posts related to that business
        type:
      </span>
      <div className="home-cards-container">
        {businessCollection.map((e,i) => (
          <Link href={`/business/${e}`} key={i}>
            <div className="home-card">
              {icons[e]}
              <span>{e}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeUser;
