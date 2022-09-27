// import React from "react";
// import { Link } from "react-router-dom";
// import classes from "./Footer.module.css";

// function Footer() {
//   return (
//     <footer className={classes.footer}>
//       <div className={classes.container}>
//         <div className={classes.row}>
//           <div className={classes["footer-col"]}>
//             <h4>Info</h4>
//             <ul>
//               <li>
//                 <Link className={classes.link} to="/about">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link className={classes.link} to="/our-services">
//                   Our Services
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/private-policy" className={classes.link}>
//                   Private Policy
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div className={classes["footer-col"]}>
//             <h4>Get Help</h4>
//             <ul>
//               <li>
//                 <Link className={classes.link} to="/faq">
//                   FAQ
//                 </Link>
//               </li>
//               <li>
//                 <Link className={classes.link} to="/subscribe">
//                   Subscribe
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className={classes["footer-col"]}>
//             <h4>Follow Us</h4>
//             {/* <div> */}
//             <div className={classes.social_link}>
//               <a href="https://www.facebook.com/koko.miles.92">
//                 <i className="fab fa-facebook-square"></i>
//               </a>
//               <a href="https://twitter.com/_KokoMarTinS?s=08">
//                 <i className="fab fa-twitter-square"></i>
//               </a>
//               <a href="https://www.instagram.com/official_kokomartins?r=nametag">
//                 <i className="fab fa-instagram-square"></i>
//               </a>
//               <a href="https://www.instagram.com/official_kokomartins?r=nametag">
//                 <i className="fab fa-tiktok"></i>
//               </a>
//               {/* </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>MAYOR BLOG</h4>
            <div className="list-unstyled">
              <li>08032347430</li>
              <li>Lagos, Nigeria</li>
            </div>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>INFO</h4>
            <ui className="list-unstyled">
              <li>
                <Link className="link" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="link" to="/our-services">
                  Our Services
                </Link>
              </li>
              <li>
                <Link className="link" to="/private-policy">
                  Private Policy{" "}
                </Link>
              </li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>GET HELP</h4>
            <ui className="list-unstyled">
              <li>
                <Link className="link" to="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="link" to="/subscribe">
                  Subscribe
                </Link>
              </li>
              <li>
                <Link className="link" to="/good-content">
                  Good Content
                </Link>
              </li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row ">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} MAYOR BLOG | All rights reserved |
            Terms Of Service | Privacy
          </p>
          <div className="col-sm social_link">
            <a href="https://www.facebook.com/koko.miles.92">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="https://twitter.com/_KokoMarTinS?s=08">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="https://www.instagram.com/official_kokomartins?r=nametag">
              <i className="fab fa-instagram-square"></i>
            </a>
            <a href="https://www.instagram.com/official_kokomartins?r=nametag">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
