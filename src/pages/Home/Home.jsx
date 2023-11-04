import React from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main>
      <div className="container">
        <div className="row gy-5 py-3">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Link to="/linergradient">
                  <h3 className="card-title">liner-gradient</h3>
                  <div className="card-icon text-center">
                    <img src="/images/liner-gradient-icon.png" alt="" />
                  </div>
                  <p className="card-text"></p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Link to="/boxshadow">
                  <h3 className="card-title">box-shadow</h3>
                  <div className="card-icon text-center">
                    <img src="/images/Box-Shadow-icon.png" alt="" />
                  </div>
                  <p className="card-text"></p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Link to="/textshadow">
                  <h3 className="card-title">text-shadow</h3>
                  <div className="card-icon text-center">
                    <img src="/images/text-shadow-icon.png" alt="" />
                  </div>
                  <p className="card-text"></p>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-sm-4'>
            <div className="card">
              <div className="card-body">
                <Link to="/imgfilter">
                  <h3 className="card-title">image-filter-generater</h3>
                  <div className="card-icon text-center">
                    <img src="/images/image-filter-generater-icon.png" alt="" />
                  </div>
                  <p className="card-text"></p>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Link to="/qrcode">
                  <h3 className="card-title">QRcode-generater</h3>
                  <div className="card-icon text-center">
                    <img src="/images/qrcode-generater-icon.png" alt="" />
                  </div>
                  <p className="card-text"></p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home