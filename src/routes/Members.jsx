import React, { useState } from "react";
import "../css/members.css";
import SearchBar from "../components/MembersSearchBar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import MemberCard from "../components/MemberCard";
import moment from "moment";
import Loader from "../components/Loader";

function Members(props) {
  const [month, setMonth] = useState("all");
  const [searchValue, setSetSearchValue] = useState("");
  const [serviceGroup, setServiceGroup] = useState("all");
  const [sortBy, setSortBy] = useState("soulsWon");
  const displayedMembers = () => {
    let members;
    if (month !== "all" && serviceGroup !== "all") {
      members =
        props.members &&
        props.members.filter(
          (member) =>
            member.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            moment(member.createdAt).month() === eval(month) &&
            member.serviceGroup.toLowerCase() === serviceGroup.toLowerCase()
        );
    } else if (month === "all" && serviceGroup !== "all") {
      members =
        props.members &&
        props.members.filter(
          (member) =>
            member.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            member.serviceGroup.toLowerCase() === serviceGroup.toLowerCase()
        );
    } else if (month !== "all" && serviceGroup === "all") {
      members =
        props.members &&
        props.members.filter(
          (member) =>
            member.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            moment(member.createdAt).month() === eval(month)
        );
    } else {
      members =
        props.members &&
        props.members.filter((member) =>
          member.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }
    if (sortBy === "soulsWon") {
      return (
        props.members &&
        members.sort((a, b) => (a.soulsWon < b.soulWon ? -1 : 1))
      );
    }
    if (sortBy === "name") {
      return (
        props.members && members.sort((a, b) => (a.name < b.name ? -1 : 1))
      );
    }
  };
  const totalMembers = props.members && displayedMembers().length;
  const changeMonth = (value) => {
    setMonth(value);
  };
  const changeSearchValue = (value) => {
    setSetSearchValue(value);
  };

  return (
    <div>
      {!props.members ? (
        <div className="loaderContainer">
          <Loader />
        </div>
      ) : (
        <div className="members soulsWonContainer">
          <div className=" row section">
            <div className="mobileContainer col-12">
              <Header {...props} page="Members" />
            </div>
            <div className="mobileContainer col-lg-2">
              <SideNav page="members" {...props} />
            </div>
            <div className="mobileContainer col-lg-10 pr-lg-0 scrollContainer">
              <SearchBar
                {...props}
                searchValue={searchValue}
                changeSearchValue={changeSearchValue}
                changeMonth={changeMonth}
                totalMembers={totalMembers}
                serviceGroup={serviceGroup}
                setServiceGroup={(value) => setServiceGroup(value)}
                sortBy={sortBy}
                setSortType={(value) => setSortBy(value)}
              />

              <div className="membersContainer row section">
                {displayedMembers().length > 0 ? (
                  displayedMembers().map((member, i) => (
                    <MemberCard key={i} {...member} store={props} />
                  ))
                ) : (
                  <div className="emptyDisplayText">no member found...</div>
                )}
              </div>
            </div>
            <div className="mobileContainer col-12">
              <Navbar page="members" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Members;
