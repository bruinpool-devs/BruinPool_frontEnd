import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import LandingNavbar from "../../../navbar/LandingNavbar";
import Footer from "../../../footer/Footer";

import TOS from "./assets/PoolUp_Terms_of_Service.pdf";
import PP from "./assets/Website_Privacy_Policy.pdf";

import "./TermsOfService.css";

const TermsOfService = () => {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [view, toggleView] = useState(false);

  return (
    <div className="policy-wrapper">
      <LandingNavbar />
      <div className="policy-title">Terms of Service & Privacy Policy</div>
      <div className="policy-content">
        <div className="policy-toggle">
          <div className="policy-toggle-buttons">
            <div
              className={
                !view ? "active-policy-toggle" : "non-active-policy-toggle"
              }
              onClick={() => toggleView(false)}
            >
              Terms of Service
            </div>
            <div
              className={
                view ? "active-policy-toggle" : "non-active-policy-toggle"
              }
              onClick={() => toggleView(true)}
            >
              Privacy Policy
            </div>
          </div>
        </div>
        <div className="policy-text">
          {!view ? (
            <Document file={TOS}>
              <Page pageNumber={1} height={507} />
            </Document>
          ) : (
            <Document file={PP}>
              <Page pageNumber={1} height={507} />
            </Document>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
