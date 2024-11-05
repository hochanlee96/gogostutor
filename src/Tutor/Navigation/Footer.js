import React, { useContext } from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

import { ModeContext } from "../../shared/context/mode-context";

const Footer = () => {
  const mode = useContext(ModeContext);

  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="/" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="/" className="me-4 text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href="/" className="me-4 text-reset">
            <MDBIcon fab icon="google" />
          </a>
          <a href="/" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="/" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="/" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h5 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                A-List
              </h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Placeat voluptates adipisci inventore est non reprehenderit,
                dignissimos sapiente odit ex reiciendis veniam, dolorem, atque
                id qui nobis? Quos voluptatibus recusandae repellat!
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">About</h6>
              <p>
                <a href="#!" className="text-reset">
                  Courses
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Blog
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Careers
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Press
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <div>
                <p onClick={mode.switchMode}>Visit student website</p>
              </div>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          alist.com
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
