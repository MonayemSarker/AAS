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
          <Carousel.Item className="banner-carousel-item" >
            <MyNav />
            <section class="section banner" >

              <h2>
                <b class="is-visible" >Welcome </b><br></br>
                <b data-aos="fade-in">To Automated Attendance System</b>
              </h2>
              <p data-aos="fade-right">AAS, An approach for tracking attendance </p>

            </section>
            <div>
              {/* <div className="slider-content">

                <h2>Core Services</h2>
                <p data-aos="fade-right">Automated Attendance System is necessary to make our education system better and to save time.</p>
              </div>
              <div class="container" style={{ marginBottom: '100px' }}>
                <div class="row" >
                  <div class="col-lg-6 offset-lg-5">
                    <div class="service-item mb-5" data-aos="fade-left">
                      <i class="ti-layout"></i>
                      <h4 class="my-3">Web Application</h4>
                      <p></p>
                    </div>
                  </div>
                  <div class="col-lg-6 offset-lg-5">
                    <div class="service-item mb-5" data-aos="fade-left" data-aos-delay="450">
                      <i class="ti-announcement"></i>
                      <h4 class="my-3">Proxy Detection</h4>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 offset-lg-5">
                    <div class="service-item mb-5 mb-lg-0" data-aos="fade-left" data-aos-delay="750">
                      <i class="ti-layers"></i>
                      <h4 class="my-3">Automated Attendance Taking</h4>
                    </div>
                  </div>
                  <div class="col-lg-6 offset-lg-5">
                    <div class="service-item" data-aos="fade-left" data-aos-delay="1000">
                      <i class="ti-anchor"></i>
                      <h4 class="my-3">Report Generation</h4>
                    </div>
                  </div>
                </div>
              </div> */}


            </div>

          </Carousel.Item >
          <Carousel.Item className="banner-carousel-item" style={{ backgroundImage: `url(${background1})` }}>
            <MyNav />
            <section class="section banner" style={{ height: "800px", paddingTop: "100px" }}>
              <div class="container" >
                <div class="row">
                  <div class="col-lg-10">
                    <h2 style={{ marginLeft: "12%" }} >

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

                    </h2>

                  </div>
                </div>
              </div>
            </section>
          </Carousel.Item>
        </Carousel >
      </section >


    </div >
  );
}

export default Welcome;