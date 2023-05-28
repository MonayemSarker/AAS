import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import background1 from '../background1.jpg';
import './Welcome.css';
import { Carousel } from 'react-bootstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import MyNav from '../OnlyNav';

export function Welcome() {
  React.useEffect(() => {
    const AOS = require('aos');
    AOS.init();
    localStorage.removeItem("accessToken");
  }, []);

  return (
    <div className="page" >
      <section class="okay">
        <Carousel>
          <Carousel.Item className="banner-carousel-item" style={{ backgroundImage: `url(${background1})` }}>
            <MyNav/>
            <section class="section banner" >
              <div class="container">
                <div class="row">
                  <div class="col-lg-10">
                    <h2 class="cd-headline clip is-full-width mb-4 " >
                      <span class="cd-words-wrapper text-color">
                        <b class="is-visible" style={{ marginLeft: "12%" }} >Welcome </b><br></br>
                        <b data-aos="fade-in" style={{ marginLeft: "12%" }} >To Automated Attendance System</b>

                      </span>
                    </h2>
                    <p data-aos="fade-right" style={{ marginLeft: "12%" }}>AAS, An approach for tracking attendance </p>
                  </div>
                </div>
              </div>
            </section>
            <div className="slider-content">
              <div className="container h-100">
                <div className="row align-items-center h-100">
                  <div className="col-md-12 text-center">
                    <section class="section service-home border-top">
                      <div class="container">
                        <div class="row">
                          <div class="col-lg-6">
                            <h2 class="mb-2 ">Core Services</h2>
                            <p class="mb-5">Automated Attendance System is necessary to make our education system better and to save time.</p>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-4">
                            <div class="service-item mb-5" data-aos="fade-left" >
                              <i class="ti-layout"></i>
                              <h4 class="my-3">Web Application</h4>
                              <p></p>

                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="service-item mb-5" data-aos="fade-left" data-aos-delay="450">
                              <i class="ti-announcement"></i>
                              <h4 class="my-3">Proxy Detection</h4>
                              {/* <p>Proxy will be detected.</p> */}
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="service-item mb-5 mb-lg-0" data-aos="fade-left" data-aos-delay="750">
                              <i class="ti-layers"></i>
                              <h4 class="my-3">Automated Attendance Taking</h4>
                              {/* <p>Something</p> */}
                            </div>
                          </div>
                          <div class="col-lg-4">
                            <div class="service-item" data-aos="fade-left" data-aos-delay="750">
                              <i class="ti-anchor"></i>
                              <h4 class="my-3">Report Generation</h4>
                              {/* <p>Again.</p> */}
                            </div>
                          </div>

                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item className="banner-carousel-item" style={{ backgroundImage: `url(${background1})` }}>
          <MyNav/>
            <section class="section banner" style={{ height: "800px", paddingTop: "100px" }}>
              <div class="container" >
                <div class="row">
                  <div class="col-lg-10">
                    <h2 class="cd-headline clip is-full-width mb-4 " style={{ marginLeft: "12%" }} >
                      <span class="cd-words-wrapper text-color" >
                        <b class="is-visible" >About </b><br></br>
                        <hr></hr>
                        <hr></hr>
                        <b>SPL-2</b><br></br>
                        <b>Supervised by   </b> <br></br>

                        <b>Dr. Sumon Ahmed </b> <br></br>
                        <hr></hr>
                        <b>Submitted by</b>  <br></br>
                        <b>Mussammat Maimuna Faria</b>  <br></br>
                        <b>BSSE 1222</b>  <br></br>
                        <b>Monayem Sarker</b>  <br></br>
                        <b>BSSE 1228</b>  <br></br>
                        {/* <b data-aos="fade-in" ></b> */}

                      </span>
                    </h2>

                  </div>
                </div>
              </div>
            </section>
          </Carousel.Item>
        </Carousel>
      </section>

     
    </div>
  );
}

export default Welcome;