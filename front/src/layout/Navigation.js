import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBeer, FaGem, FaUsers } from "react-icons/fa";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import {
  Iconscourse,
  IconModule,
  IconCourseUnit,
  IconQuestion,
  BlogIcon,
  BlogCategory,
  Gallery,
} from "./icon";

import { MdOutlineDashboard, MdViewHeadline, MdMenu } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import "react-pro-sidebar/dist/css/styles.css";
import { Button } from "react-bootstrap";
const NavigationMenu = (props) => {
  return (
    <>
      <div className="sidebarmenubar">
        <div className="sidebarmenulist">
          <ProSidebar className={props.menuCollapse ? null : "collapsed"}>
            <SidebarHeader>
              {props.menuCollapse ? (
                <div className="logo-field">
                  <img src="images\iDriverly Logo.png" alt="" />
                  {/*   <Button className="menubarbtn" onClick={menuToggle}><MdMenu/></Button> */}
                </div>
              ) : (
                <img src="images\iDriverly-Logo-small.png" alt="" />
              )}
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square">
                <MenuItem icon={<MdOutlineDashboard />}>
                  Dashboard
                  <Link to="/dashboard" />
                </MenuItem>
                {/*  <SubMenu title="Profile" icon={<CgProfile />}>
                  <MenuItem>
                    Profile
                    <Link to="/profile" />
                  </MenuItem>
                </SubMenu>
                 <MenuItem icon={<FaUsers />}>
                  Get All Users
                  <Link to="/user" />
                </MenuItem> */}
                <MenuItem icon={<Iconscourse />}>
                  Course Title
                  <Link to="/course" />
                </MenuItem>
                <MenuItem icon={<IconModule />}>
                  Course Module
                  <Link to="/coursemodule" />
                </MenuItem>
                <MenuItem icon={<IconCourseUnit />}>
                  Course Unit
                  <Link to="/courseunit" />
                </MenuItem>
                <MenuItem icon={<IconQuestion />}>
                  Question
                  <Link to="/question" />
                </MenuItem>
                {/*  <MenuItem icon={<Gallery />}>
                  Gallery
                  <Link to="/gallery" />
                </MenuItem>
                <MenuItem icon={<IconQuestion />}>
                  Edit question
                  <Link to="/ckunit" />
                </MenuItem>
                // <MenuItem icon={<MdViewHeadline />}>
                //   Question
                //   <Link to="/question" />
                // </MenuItem> */}
                <SubMenu title="Blog" icon={<CgProfile />}>
                  <MenuItem icon={<BlogCategory />}>
                    Blog Category
                    <Link to="/blogcategory " />
                  </MenuItem>
                  <MenuItem icon={<BlogIcon />}>
                    Blog
                    <Link to="/blog" />
                  </MenuItem>
                </SubMenu>
                <MenuItem icon={<Gallery />}>
                  Gallery
                  <Link to="/gallery2" />
                </MenuItem>
                <MenuItem icon={<Gallery />}>
                  Add Image
                  <Link to="/add-image" />
                </MenuItem>
              </Menu>
            </SidebarContent>
          </ProSidebar>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;
