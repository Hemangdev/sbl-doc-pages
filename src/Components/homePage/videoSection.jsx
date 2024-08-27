import React from "react";
import { Image } from "react-bootstrap";
import Newbanner from "../../image/new-banner.jpg"
import Closebutton from "../../image/close-button.svg"



const VideoSection = () => {

  return (
    <section className="approach-section">
      <div className="container">
        <div className="home-patine-banner">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-12 col-12">
              <h3>Homoeopathic Approach</h3>
              <p> At SBL we believe there's a better way to feel better with homoeopathic. Discover this holistic system of medicine and all the benefits it can offer to you.</p>
              <button type="button" class="btn home-partice-button">
                Learn About Homeopathy
              </button>




            </div>

            <div className="col-md-6 12 col-sm-12 col-lg-7 col-12">
              <div className="play-button-row">
              <button type="button" class="btn play-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                {/* <Image src={Newbanner} className="img-fluid" alt="New Banner" /> */}
                play Video
              </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">

              <div class="modal-body">
                <div class="ratio ratio-16x9">
                  <iframe src="https://www.youtube.com/embed/FViz8ybmge4?si=Pai9H01nJqd5-m4q" title="YouTube video" allowfullscreen></iframe>
                </div>
                <button type="button" class="btn close-button" data-bs-dismiss="modal" aria-label="Close">
                  <Image src={Closebutton} className="img-fluid" alt="Close" height={15} width={15} />
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection